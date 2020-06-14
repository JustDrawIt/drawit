defmodule DrawIt.Games.Player do
  use DrawIt.Schema
  import Ecto.Changeset

  alias DrawIt.Games.Game

  schema "game_players" do
    field :nickname, :string
    field :score, :integer, default: 0

    belongs_to :game, Game, foreign_key: :id_game

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:id_game, :nickname, :score])
    |> validate_required([:id_game, :nickname])
  end
end
