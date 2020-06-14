defmodule DrawItWeb.GameControllerTest do
  use DrawItWeb.ConnCase

  alias DrawIt.Games
  alias DrawIt.Games.Game

  @create_attrs %{
    max_players: 10,
    max_rounds: 10
  }
  @update_attrs %{
    max_players: 12,
    max_rounds: 16
  }
  @invalid_attrs %{
    max_players: nil,
    max_rounds: nil
  }

  def fixture(:game) do
    {:ok, game} = Games.create_game(@create_attrs)
    game
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all games", %{conn: conn} do
      conn = get(conn, Routes.game_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end

    test "lists game with join_code", %{conn: conn} do
      {:ok, _game1} = Games.create_game(@create_attrs)
      {:ok, game2} = Games.create_game(@create_attrs)
      {:ok, _game3} = Games.create_game(@create_attrs)

      conn = get(conn, Routes.game_path(conn, :index, join_code: game2.join_code))

      %{
        id: expected_id,
        join_code: expected_join_code,
        max_players: expected_max_players,
        max_rounds: expected_max_rounds
      } = game2

      expected_date_inserted = NaiveDateTime.to_iso8601(game2.date_inserted)
      expected_date_updated = NaiveDateTime.to_iso8601(game2.date_updated)

      assert [
               %{
                 "id" => ^expected_id,
                 "join_code" => ^expected_join_code,
                 "max_players" => ^expected_max_players,
                 "max_rounds" => ^expected_max_rounds,
                 "date_inserted" => ^expected_date_inserted,
                 "date_updated" => ^expected_date_updated
               }
             ] = json_response(conn, 200)["data"]
    end
  end

  describe "create game" do
    test "renders game when data is valid", %{conn: conn} do
      conn = post(conn, Routes.game_path(conn, :create), game: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.game_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.game_path(conn, :create), game: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update game" do
    setup [:create_game]

    test "renders game when data is valid", %{conn: conn, game: %Game{id: id} = game} do
      conn = put(conn, Routes.game_path(conn, :update, game), game: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.game_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, game: game} do
      conn = put(conn, Routes.game_path(conn, :update, game), game: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete game" do
    setup [:create_game]

    test "deletes chosen game", %{conn: conn, game: game} do
      conn = delete(conn, Routes.game_path(conn, :delete, game))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.game_path(conn, :show, game))
      end
    end
  end

  defp create_game(_) do
    game = fixture(:game)
    {:ok, game: game}
  end
end
