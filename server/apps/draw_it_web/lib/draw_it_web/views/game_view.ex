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
      max_rounds: game.max_rounds,
      language: game.language,
      date_inserted: game.date_inserted,
      date_updated: game.date_updated,
      round_length_ms: game.round_length_ms,
      players: Enum.map(game.players, &DrawItWeb.PlayerView.render("player.json", %{player: &1})),
      rounds: Enum.map(game.rounds, &DrawItWeb.RoundView.render("round.json", %{round: &1}))
    }
  end
end
