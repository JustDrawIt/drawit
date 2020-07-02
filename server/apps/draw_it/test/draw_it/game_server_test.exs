defmodule DrawIt.GameServerTest do
  use DrawIt.DataCase

  alias DrawIt.Games
  alias DrawIt.GameServer

  @game_attrs %{
    max_players: 4,
    max_rounds: 4,
    round_length_ms: 20
  }
  @current_player_nickname "Chani"
  @other_players_nicknames ["Alia", "Ghanima", "Leto II"]
  @players_nicknames [@current_player_nickname | @other_players_nicknames]
  @end_round_timeout Keyword.get(
                       Application.get_env(:draw_it, DrawIt.GameServer),
                       :end_round_timeout
                     )

  def game_fixture(attrs \\ %{}) do
    {:ok, game} =
      attrs
      |> Enum.into(@game_attrs)
      |> Games.create_game()

    game
  end

  defp join_game(%{game: game}) do
    {:ok, player} =
      GameServer.join(game.join_code, %{
        nickname: @current_player_nickname,
        token: "test token"
      })

    updated_game = Games.get_game!(game.id)

    %{current_player: player, game: updated_game}
  end

  defp add_other_players(%{game: game}) do
    Enum.each(@other_players_nicknames, fn nickname ->
      {:ok, _player} =
        GameServer.join(game.join_code, %{
          nickname: nickname,
          token: "test token"
        })
    end)

    updated_game = Games.get_game!(game.id)

    %{game: updated_game}
  end

  defp start_round(%{game: game}) do
    :ok = GameServer.start(game.join_code, %{from_pid: self()})
    assert_receive {:round_started, %{round: %Games.Round{} = round}}, game.round_length_ms + 10

    %{round: round}
  end

  setup do
    game = game_fixture()
    {:ok, server} = GameServer.start_link(game: game)

    %{server: server, game: game}
  end

  describe "join/2" do
    setup [:join_game]

    test "saves new player", %{current_player: current_player} do
      assert current_player
    end

    test "only saves player with nickname once", %{game: game} do
      {:ok, _player} =
        GameServer.join(game.join_code, %{
          nickname: @current_player_nickname,
          token: "test token"
        })

      updated_game = Games.get_game!(game.id)

      assert updated_game.players == game.players
    end

    test "returns error if reached max players", %{game: game} do
      add_other_players(%{game: game})

      assert {:error, :reached_max_players} =
               GameServer.join(game.join_code, %{
                 nickname: "Baron Vladimir Harkonnen",
                 token: "test token"
               })
    end

    @tag skip: "not implemented until leave/2"
    test "returns error if reached max players that have joined", %{game: game} do
      _other_players = add_other_players(%{game: game})

      # disconnect and reconnet a few players

      assert {:error, :reached_max_players} =
               GameServer.join(game.join_code, %{
                 nickname: "Baron Vladimir Harkonnen",
                 token: "test token"
               })
    end
  end

  # describe "leave/2" do
  #   setup [:join_game]
  # end

  describe "start/2" do
    setup [:join_game, :add_other_players]

    test "sends :round_started to process", %{
      game: game,
      current_player: current_player
    } do
      :ok =
        GameServer.start(game.join_code, %{
          player: current_player,
          from_pid: self()
        })

      assert_receive {:round_started, %{round: %Games.Round{}}}, game.round_length_ms + 10
    end

    test "saves new round", %{game: game, current_player: current_player} do
      assert :ok =
               GameServer.start(game.join_code, %{
                 player: current_player,
                 from_pid: self()
               })

      assert_receive {:round_started, %{round: round}}, game.round_length_ms + 10
      assert round.player_drawer.nickname in @players_nicknames
    end

    test "selects players to draw that haven't drawn yet", %{
      game: game,
      current_player: current_player
    } do
      :ok =
        GameServer.start(game.join_code, %{
          player: current_player,
          from_pid: self()
        })

      1..@game_attrs.max_players
      |> Enum.reduce([], fn num, players_drawn ->
        assert_receive {:round_started, %{round: round}}, num * game.round_length_ms

        assert_receive {:round_ended, _payload},
                       num * game.round_length_ms + @end_round_timeout

        assert round.player_drawer not in players_drawn

        [round.player_drawer | players_drawn]
      end)
    end

    test "sends :round_ended to process after round time", %{
      game: game,
      current_player: current_player
    } do
      :ok =
        GameServer.start(game.join_code, %{
          player: current_player,
          from_pid: self()
        })

      assert_receive {:round_ended, _payload}, game.round_length_ms + 10
    end

    test "sends :round_started for every round", %{
      game: game,
      current_player: current_player
    } do
      :ok =
        GameServer.start(game.join_code, %{
          player: current_player,
          from_pid: self()
        })

      1..@game_attrs.max_rounds
      |> Enum.each(fn round_num ->
        expected_timeout = round_num * game.round_length_ms
        assert_receive {:round_started, _payload}, expected_timeout
      end)
    end
  end

  describe "guess/2" do
    setup [:join_game, :add_other_players, :start_round]

    test "returns true if guess matches round's word", %{
      game: game,
      current_player: current_player,
      round: round
    } do
      assert {:ok, true} =
               GameServer.guess(game.join_code, %{
                 player: current_player,
                 guess: round.word
               })
    end

    test "returns false if guess doesn't matches round's word", %{
      game: game,
      current_player: current_player
    } do
      assert {:ok, false} =
               GameServer.guess(game.join_code, %{
                 player: current_player,
                 guess: "koala"
               })
    end

    test "returns true if guess is substring of round's word", %{
      game: game,
      current_player: current_player,
      round: round
    } do
      assert {:ok, true} =
               GameServer.guess(game.join_code, %{
                 player: current_player,
                 guess: "is the word #{round.word}?"
               })
    end

    test "returns true if guess doesn't match casing", %{
      game: game,
      current_player: current_player,
      round: round
    } do
      assert {:ok, true} =
               GameServer.guess(game.join_code, %{
                 player: current_player,
                 guess: String.upcase(round.word)
               })
    end

    test "returns false if round hasn't started", %{
      game: game,
      current_player: current_player
    } do
      assert {:ok, false} =
               GameServer.guess(game.join_code, %{
                 player: current_player,
                 guess: "fish"
               })
    end

    test "increments the player's score if guess is correct", %{
      game: game,
      current_player: current_player,
      round: round
    } do
      {:ok, true} =
        GameServer.guess(game.join_code, %{
          player: current_player,
          guess: round.word
        })

      updated_player = Games.get_player!(current_player.id)

      assert updated_player.score == current_player.score + 1
    end

    @tag skip: true
    test "only increments the player's score once per round", %{
      game: game,
      current_player: original_player,
      round: round1
    } do
      {:ok, true} =
        GameServer.guess(game.join_code, %{
          player: original_player,
          guess: round1.word
        })

      {:ok, true} =
        GameServer.guess(game.join_code, %{
          player: original_player,
          guess: round1.word
        })

      updated_player = Games.get_player!(original_player.id)
      assert updated_player.score == original_player.score + 1

      # assert_receive {:end_round, }
      # {:ok, _game} = GameServer.end_round(game.join_code, %{})
      {:ok, round2} = GameServer.start(game.join_code, %{})

      {:ok, true} =
        GameServer.guess(game.join_code, %{
          player: original_player,
          guess: round2.word
        })

      updated_player = Games.get_player!(original_player.id)
      assert updated_player.score == original_player.score + 2
    end

    test "only increments the player's score by 1", %{
      game: game,
      current_player: original_player,
      round: round
    } do
      {:ok, true} =
        GameServer.guess(game.join_code, %{
          player: %Games.Player{original_player | score: 500},
          guess: round.word
        })

      updated_player = Games.get_player!(original_player.id)
      assert updated_player.score == original_player.score + 1
    end

    test "ends the round if all players have guessed correctly", %{game: game, round: round} do
      updated_game = Games.get_game!(game.id)
      assert length(updated_game.rounds) == 1

      game.players
      |> Enum.filter(fn player -> player != round.player_drawer end)
      |> Enum.each(fn player ->
        {:ok, true} =
          GameServer.guess(game.join_code, %{
            player: player,
            guess: round.word
          })
      end)

      assert_receive {:round_ended, _payload}
      assert_receive {:round_started, _payload}

      updated_game = Games.get_game!(game.id)
      assert length(updated_game.rounds) == 2
    end
  end
end
