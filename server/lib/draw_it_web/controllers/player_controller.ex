defmodule DrawItWeb.PlayerController do
  use DrawItWeb, :controller

  alias DrawIt.Games
  alias DrawIt.Games.Player

  action_fallback DrawItWeb.FallbackController

  def index(conn, %{"game_id" => game_id}) do
    game_players = Games.list_game_players(game_id)
    render(conn, "index.json", game_players: game_players)
  end

  def create(conn, %{"game_id" => game_id, "player" => player_params}) do
    player_params =
      Map.merge(player_params, %{
        "id_game" => game_id
      })

    with {:ok, %Player{} = player} <- Games.create_player(player_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.game_player_path(conn, :show, game_id, player))
      |> render("show.json", player: player)
    end
  end

  def show(conn, %{"id" => id}) do
    player = Games.get_player!(id)
    render(conn, "show.json", player: player)
  end

  def update(conn, %{"id" => id, "player" => player_params}) do
    player = Games.get_player!(id)

    with {:ok, %Player{} = player} <- Games.update_player(player, player_params) do
      render(conn, "show.json", player: player)
    end
  end

  def delete(conn, %{"id" => id}) do
    player = Games.get_player!(id)

    with {:ok, %Player{}} <- Games.delete_player(player) do
      send_resp(conn, :no_content, "")
    end
  end
end
