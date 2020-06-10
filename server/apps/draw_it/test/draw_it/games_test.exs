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
end
