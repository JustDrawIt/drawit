defmodule DrawIt.Games.Player do
  use Ecto.Schema
  import Ecto.Changeset

  alias DrawIt.Games.Game

  schema "game_players" do
    field :nickname, :string

    belongs_to :game, Game, foreign_key: :id_game

    timestamps()
  end

  @doc false
  def changeset(player, attrs) do
    player
    |> cast(attrs, [:id_game, :nickname])
    |> validate_required([:id_game, :nickname])
  end
end
