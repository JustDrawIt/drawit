defmodule DrawItWeb.GameView do
  use DrawItWeb, :view
  alias DrawItWeb.GameView

  def render("index.json", %{games: games}) do
    %{data: render_many(games, GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{data: render_one(game, GameView, "game.json")}
  end

  def render("game.json", %{game: game}) do
    %{
      id: game.id,
      join_code: game.join_code,
      max_players: game.max_players,
      max_rounds: game.max_rounds
    }
  end
end
