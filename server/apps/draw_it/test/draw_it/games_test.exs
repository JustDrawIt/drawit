defmodule DrawIt.GamesTest do
  use DrawIt.DataCase

  alias DrawIt.Games

  describe "games" do
    alias DrawIt.Games.Game

    @valid_attrs %{
      join_code: "some join_code",
      max_players: 10,
      max_rounds: 10
    }
    @update_attrs %{
      join_code: "some updated join_code",
      max_players: 12,
      max_rounds: 16
    }
    @invalid_attrs %{join_code: nil, max_players: nil, max_rounds: nil, name: nil}

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

    test "create_game/1 with valid data creates a game" do
      assert {:ok, %Game{} = game} = Games.create_game(@valid_attrs)
      assert game.join_code == @valid_attrs.join_code
      assert game.max_players == @valid_attrs.max_players
      assert game.max_rounds == @valid_attrs.max_rounds
    end

    test "create_game/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Games.create_game(@invalid_attrs)
    end

    test "update_game/2 with valid data updates the game" do
      game = game_fixture()
      assert {:ok, %Game{} = game} = Games.update_game(game, @update_attrs)
      assert game.join_code == @update_attrs.join_code
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

    @valid_attrs %{nickname: "some nickname"}
    @update_attrs %{nickname: "some updated nickname"}
    @invalid_attrs %{nickname: nil}

    def player_fixture(attrs \\ %{}) do
      {:ok, game} =
        Games.create_game(%{
          join_code: "test join code",
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

    test "list_game_players/0 returns all game_players" do
      player = player_fixture()
      assert Games.list_game_players() == [player]
    end

    test "get_player!/1 returns the player with given id" do
      player = player_fixture()
      assert Games.get_player!(player.id) == player
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
      assert player.nickname == "some updated nickname"
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
          join_code: "test join code",
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
      assert round.word == "some word"
    end

    test "create_round/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Games.create_round(@invalid_attrs)
    end

    test "update_round/2 with valid data updates the round" do
      round = round_fixture()
      assert {:ok, %Round{} = round} = Games.update_round(round, @update_attrs)
      assert round.word == "some updated word"
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
