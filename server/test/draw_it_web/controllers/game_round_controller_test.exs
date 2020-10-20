defmodule DrawItWeb.GameRoundControllerTest do
  use DrawItWeb.ConnCase

  alias DrawIt.Games
  alias DrawIt.Games.Round

  @create_attrs %{word: "some word"}
  @update_attrs %{word: "some updated word"}
  @invalid_attrs %{word: nil}

  def fixture(:round) do
    {:ok, game} =
      Games.create_game(%{
        max_players: 3,
        max_rounds: 5
      })

    {:ok, player} =
      Games.create_player(%{
        id_game: game.id,
        nickname: "test nickname"
      })

    {:ok, round} =
      @create_attrs
      |> Map.merge(%{id_game: game.id, id_player_drawer: player.id})
      |> Games.create_round()

    %{game: game, player: player, round: round}
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all game_rounds", %{conn: conn} do
      {:ok, game} = Games.create_game(%{max_players: 3, max_rounds: 5})
      conn = get(conn, Routes.game_round_path(conn, :index, game.id))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create round" do
    setup [:create_round]

    test "renders round when data is valid", %{conn: conn, game: game, player: player} do
      round = Map.merge(@create_attrs, %{id_player_drawer: player.id})
      conn = post(conn, Routes.game_round_path(conn, :create, game.id), round: round)

      expected_word = @create_attrs.word

      assert %{
               "id" => id,
               "word" => ^expected_word
             } = json_response(conn, 201)["data"]

      conn = get(conn, Routes.game_round_path(conn, :show, game.id, id))

      assert %{
               "id" => ^id,
               "word" => ^expected_word
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, game: game, player: player} do
      round = Map.merge(@invalid_attrs, %{id_player_drawer: player.id})
      conn = post(conn, Routes.game_round_path(conn, :create, game.id), round: round)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update round" do
    setup [:create_round]

    test "renders round when data is valid", %{
      conn: conn,
      game: game,
      player: _player,
      round: %Round{id: id} = round
    } do
      conn =
        put(conn, Routes.game_round_path(conn, :update, game.id, round), round: @update_attrs)

      expected_word = @update_attrs.word

      assert %{
               "id" => ^id,
               "word" => ^expected_word
             } = json_response(conn, 200)["data"]

      conn = get(conn, Routes.game_round_path(conn, :show, game.id, id))

      assert %{
               "id" => ^id,
               "word" => ^expected_word
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      game: game,
      player: _player,
      round: round
    } do
      conn =
        put(conn, Routes.game_round_path(conn, :update, game.id, round), round: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete round" do
    setup [:create_round]

    test "deletes chosen round", %{conn: conn, game: game, round: round} do
      conn = delete(conn, Routes.game_round_path(conn, :delete, game.id, round))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.game_round_path(conn, :show, game.id, round))
      end
    end
  end

  defp create_round(_) do
    %{game: game, player: player, round: round} = fixture(:round)
    {:ok, game: game, player: player, round: round}
  end
end
