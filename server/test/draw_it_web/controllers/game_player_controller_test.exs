defmodule DrawItWeb.GamePlayerControllerTest do
  use DrawItWeb.ConnCase

  alias DrawIt.Games
  alias DrawIt.Games.Player

  @create_attrs %{nickname: "some nickname", score: 0}
  @update_attrs %{nickname: "some updated nickname", score: 2}
  @invalid_attrs %{nickname: nil, score: nil}

  def fixture(:player) do
    {:ok, game} =
      Games.create_game(%{
        max_players: 4,
        max_rounds: 5
      })

    {:ok, player} =
      @create_attrs
      |> Map.merge(%{id_game: game.id})
      |> Games.create_player()

    %{game: game, player: player}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all game_players", %{conn: conn} do
      {:ok, game} = Games.create_game(%{max_players: 4, max_rounds: 5})
      conn = get(conn, Routes.game_player_path(conn, :index, game.id))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create player" do
    setup [:create_player]

    test "renders player when data is valid", %{conn: conn, game: game} do
      conn = post(conn, Routes.game_player_path(conn, :create, game.id), player: @create_attrs)

      expected_nickname = @create_attrs.nickname
      expected_score = @create_attrs.score

      assert %{
               "id" => id,
               "nickname" => ^expected_nickname,
               "score" => ^expected_score
             } = json_response(conn, 201)["data"]

      conn = get(conn, Routes.game_player_path(conn, :show, game.id, id))

      assert %{
               "id" => ^id,
               "nickname" => ^expected_nickname,
               "score" => ^expected_score
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, game: game} do
      conn = post(conn, Routes.game_player_path(conn, :create, game.id), player: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update player" do
    setup [:create_player]

    test "renders player when data is valid", %{
      conn: conn,
      game: game,
      player: %Player{id: id} = player
    } do
      conn =
        put(conn, Routes.game_player_path(conn, :update, game.id, player), player: @update_attrs)

      expected_nickname = @update_attrs.nickname
      expected_score = @update_attrs.score

      assert %{
               "id" => ^id,
               "nickname" => ^expected_nickname,
               "score" => ^expected_score
             } = json_response(conn, 200)["data"]

      conn = get(conn, Routes.game_player_path(conn, :show, game.id, id))

      assert %{
               "id" => ^id,
               "nickname" => ^expected_nickname,
               "score" => ^expected_score
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, game: game, player: player} do
      conn =
        put(conn, Routes.game_player_path(conn, :update, game.id, player), player: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete player" do
    setup [:create_player]

    test "deletes chosen player", %{conn: conn, game: game, player: player} do
      conn = delete(conn, Routes.game_player_path(conn, :delete, game.id, player))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.game_player_path(conn, :show, player, game.id))
      end
    end
  end

  defp create_player(_) do
    %{game: game, player: player} = fixture(:player)
    {:ok, game: game, player: player}
  end
end
