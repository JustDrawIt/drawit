defmodule DrawItWeb.PlayerView do
  use DrawItWeb, :view
  alias DrawItWeb.PlayerView

  def render("index.json", %{game_players: game_players}) do
    %{data: render_many(game_players, PlayerView, "player.json")}
  end

  def render("show.json", %{player: player}) do
    %{data: render_one(player, PlayerView, "player.json")}
  end

  def render("player.json", %{player: player}) do
    %{id: player.id, nickname: player.nickname, score: player.score}
  end
end
