defmodule DrawIt.GameServerTest do
  use DrawIt.DataCase

  alias DrawIt.Games
  alias DrawIt.GameServer

  @game_attrs %{
    max_players: 3,
    max_rounds: 4,
    round_length_ms: 100
  }
  @current_player_nickname "Chani"
  @other_players_nicknames ["Alia", "Ghanima", "Leto II"]
  @players_nicknames [@current_player_nickname | @other_players_nicknames]

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

  defp add_players(%{game: game}) do
    Enum.each(@other_players_nicknames, fn nickname ->
      {:ok, _player} =
        GameServer.join(game.join_code, %{
          nickname: nickname,
          token: "test token"
        })
    end)
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
  end

  describe "start_round/2" do
    setup [:join_game, :add_players]

    test "saves new round", %{game: game, current_player: current_player} do
      assert {:ok, %Games.Round{} = round} =
               GameServer.start_round(game.join_code, %{
                 player: current_player,
                 on_end_callback: fn -> nil end
               })

      assert round.player_drawer.nickname in @players_nicknames
    end

    test "returns error if round is already in progress", %{
      game: game,
      current_player: current_player
    } do
      {:ok, _round} =
        GameServer.start_round(game.join_code, %{
          player: current_player
        })

      assert {:error, :already_started} =
               GameServer.start_round(game.join_code, %{
                 player: current_player
               })
    end

    test "returns error if reached max rounds", %{game: game, current_player: current_player} do
      Enum.each(1..@game_attrs.max_rounds, fn _ ->
        {:ok, _round} =
          GameServer.start_round(game.join_code, %{
            player: current_player
          })

        :ok =
          GameServer.end_round(game.join_code, %{
            player: current_player
          })
      end)

      assert {:error, :reached_max_rounds} =
               GameServer.start_round(game.join_code, %{
                 player: current_player
               })
    end
  end

  describe "end_round/2" do
    setup [:join_game, :add_players]
  end

  describe "guess/2" do
  end

  describe "draw/2" do
  end
end
