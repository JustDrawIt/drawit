defmodule DrawIt.GamesTest do
  use DrawIt.DataCase

  alias DrawIt.Games

  describe "games" do
    alias DrawIt.Games.Game

    @valid_attrs %{
      max_players: 10,
      max_rounds: 10
    }
    @update_attrs %{
      max_players: 12,
      max_rounds: 16
    }
    @invalid_attrs %{
      max_players: -1,
      max_rounds: "2"
    }

    def game_fixture(attrs \\ %{}) do
      {:ok, game} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Games.create_game()

      game
    end

    test "list_games/0 returns all games" do
      game = game_fixture()
      assert Games.list_games() == [game]
    end

    test "get_game!/1 returns the game with given id" do
      game = game_fixture()
      assert Games.get_game!(game.id) == game
    end

    test "get_game_by_join_code!/1 returns the game with given join_code" do
      game = game_fixture()
      assert Games.get_game_by_join_code!(game.join_code) == game
    end

    test "create_game/1 with valid data creates a game" do
      assert {:ok, %Game{} = game} = Games.create_game(@valid_attrs)
      assert game.join_code
      assert game.max_players == @valid_attrs.max_players
      assert game.max_rounds == @valid_attrs.max_rounds
    end

    test "create_game/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Games.create_game(@invalid_attrs)
    end

    test "update_game/2 with valid data updates the game" do
      game = game_fixture()
      assert {:ok, %Game{} = game} = Games.update_game(game, @update_attrs)
      assert game.max_players == @update_attrs.max_players
      assert game.max_rounds == @update_attrs.max_rounds
    end

    test "update_game/2 with invalid data returns error changeset" do
      game = game_fixture()
      assert {:error, %Ecto.Changeset{}} = Games.update_game(game, @invalid_attrs)
      assert game == Games.get_game!(game.id)
    end

    test "delete_game/1 deletes the game" do
      game = game_fixture()
      assert {:ok, %Game{}} = Games.delete_game(game)
      assert_raise Ecto.NoResultsError, fn -> Games.get_game!(game.id) end
    end

    test "change_game/1 returns a game changeset" do
      game = game_fixture()
      assert %Ecto.Changeset{} = Games.change_game(game)
    end
  end

  describe "game_players" do
    alias DrawIt.Games.Player

    @valid_attrs %{nickname: "some nickname", score: 0}
    @update_attrs %{nickname: "some updated nickname", score: 4}
    @invalid_attrs %{nickname: nil, score: nil}

    def player_fixture(attrs \\ %{}) do
      {:ok, game} =
        Games.create_game(%{
          max_players: 4,
          max_rounds: 5
        })

      {:ok, player} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Map.merge(%{id_game: game.id})
        |> Games.create_player()

      player
    end

    test "list_game_players/1 returns all the players in a game" do
      {:ok, game1} = Games.create_game(%{max_players: 4, max_rounds: 5})
      {:ok, game2} = Games.create_game(%{max_players: 4, max_rounds: 5})

      {:ok, game1_player1} = Games.create_player(%{id_game: game1.id, nickname: "Steven"})
      {:ok, game1_player2} = Games.create_player(%{id_game: game1.id, nickname: "Pearl"})
      {:ok, game1_player3} = Games.create_player(%{id_game: game1.id, nickname: "Amethyst"})

      {:ok, _game2_player1} = Games.create_player(%{id_game: game2.id, nickname: "Paul"})
      {:ok, _game2_player2} = Games.create_player(%{id_game: game2.id, nickname: "Jessica"})

      assert Games.list_game_players(game1.id) == [game1_player1, game1_player2, game1_player3]
    end

    test "get_player!/1 returns the player with given id" do
      player = player_fixture()
      assert Games.get_player!(player.id) == player
    end

    test "get_player_by_token!/1 returns the player with given token" do
      player = player_fixture()
      assert Games.get_player_by_token!(player.token) == player
    end

    test "get_player_by_token!/1 raises Ecto.NoResultsError if no player has token" do
      assert_raise Ecto.NoResultsError, fn -> Games.get_player_by_token!("invalid_token") end
    end

    test "create_player/1 with valid data creates a player" do
      assert %Player{} = player = player_fixture()
      assert player.nickname == "some nickname"
    end

    test "create_player/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Games.create_player(@invalid_attrs)
    end

    test "update_player/2 with valid data updates the player" do
      player = player_fixture()
      assert {:ok, %Player{} = player} = Games.update_player(player, @update_attrs)
      assert player.nickname == @update_attrs.nickname
      assert player.score == @update_attrs.score
    end

    test "update_player/2 with invalid data returns error changeset" do
      player = player_fixture()
      assert {:error, %Ecto.Changeset{}} = Games.update_player(player, @invalid_attrs)
      assert player == Games.get_player!(player.id)
    end

    test "delete_player/1 deletes the player" do
      player = player_fixture()
      assert {:ok, %Player{}} = Games.delete_player(player)
      assert_raise Ecto.NoResultsError, fn -> Games.get_player!(player.id) end
    end

    test "change_player/1 returns a player changeset" do
      player = player_fixture()
      assert %Ecto.Changeset{} = Games.change_player(player)
    end
  end

  describe "game_rounds" do
    alias DrawIt.Games.Round

    @valid_attrs %{word: "some word"}
    @update_attrs %{word: "some updated word"}
    @invalid_attrs %{word: nil}

    def round_fixture(attrs \\ %{}) do
      {:ok, game} =
        Games.create_game(%{
          max_players: 3,
          max_rounds: 5
        })

      {:ok, player} =
        Games.create_player(%{
          id_game: game.id,
          nickname: "Wendy"
        })

      {:ok, round} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Map.merge(%{id_game: game.id, id_player_drawer: player.id})
        |> Games.create_round()

      round
    end

    test "list_game_rounds/0 returns all game_rounds" do
      round = round_fixture()
      assert Games.list_game_rounds() == [round]
    end

    test "get_round!/1 returns the round with given id" do
      round = round_fixture()
      assert Games.get_round!(round.id) == round
    end

    test "create_round/1 with valid data creates a round" do
      assert %Round{} = round = round_fixture()
      assert round.word == @valid_attrs.word
    end

    test "create_round/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Games.create_round(@invalid_attrs)
    end

    test "update_round/2 with valid data updates the round" do
      round = round_fixture()
      assert {:ok, %Round{} = round} = Games.update_round(round, @update_attrs)
      assert round.word == @update_attrs.word
    end

    test "update_round/2 with invalid data returns error changeset" do
      round = round_fixture()
      assert {:error, %Ecto.Changeset{}} = Games.update_round(round, @invalid_attrs)
      assert round == Games.get_round!(round.id)
    end

    test "delete_round/1 deletes the round" do
      round = round_fixture()
      assert {:ok, %Round{}} = Games.delete_round(round)
      assert_raise Ecto.NoResultsError, fn -> Games.get_round!(round.id) end
    end

    test "change_round/1 returns a round changeset" do
      round = round_fixture()
      assert %Ecto.Changeset{} = Games.change_round(round)
    end
  end
end
