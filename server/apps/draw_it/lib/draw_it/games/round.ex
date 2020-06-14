defmodule DrawIt.Games.Round do
  use DrawIt.Schema
  import Ecto.Changeset

  alias DrawIt.Games.{Game, Player}

  schema "game_rounds" do
    field :word, :string

    belongs_to :game, Game, foreign_key: :id_game
    belongs_to :player_drawer, Player, foreign_key: :id_player_drawer

    timestamps()
  end

  @doc false
  def changeset(round, attrs) do
    round
    |> cast(attrs, [:id_game, :id_player_drawer, :word])
    |> validate_required([:id_game, :id_player_drawer, :word])
  end
end
