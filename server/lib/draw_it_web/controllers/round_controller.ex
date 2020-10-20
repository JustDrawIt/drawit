defmodule DrawItWeb.RoundController do
  use DrawItWeb, :controller

  alias DrawIt.Games
  alias DrawIt.Games.Round

  action_fallback DrawItWeb.FallbackController

  def index(conn, _params) do
    game_rounds = Games.list_game_rounds()
    render(conn, "index.json", game_rounds: game_rounds)
  end

  def create(conn, %{"game_id" => game_id, "round" => round_params}) do
    round_params =
      Map.merge(round_params, %{
        "id_game" => game_id
      })

    with {:ok, %Round{} = round} <- Games.create_round(round_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.game_round_path(conn, :show, game_id, round))
      |> render("show.json", round: round)
    end
  end

  def show(conn, %{"id" => id}) do
    round = Games.get_round!(id)
    render(conn, "show.json", round: round)
  end

  def update(conn, %{"id" => id, "round" => round_params}) do
    round = Games.get_round!(id)

    with {:ok, %Round{} = round} <- Games.update_round(round, round_params) do
      render(conn, "show.json", round: round)
    end
  end

  def delete(conn, %{"id" => id}) do
    round = Games.get_round!(id)

    with {:ok, %Round{}} <- Games.delete_round(round) do
      send_resp(conn, :no_content, "")
    end
  end
end
