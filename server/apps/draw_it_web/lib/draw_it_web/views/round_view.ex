defmodule DrawItWeb.RoundView do
  use DrawItWeb, :view
  alias DrawItWeb.RoundView

  def render("index.json", %{game_rounds: game_rounds}) do
    %{data: render_many(game_rounds, RoundView, "round.json")}
  end

  def render("show.json", %{round: round}) do
    %{data: render_one(round, RoundView, "round.json")}
  end

  def render("round.json", %{round: round}) do
    %{id: round.id, word: round.word}
  end
end
