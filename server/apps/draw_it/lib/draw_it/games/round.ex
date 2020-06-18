defmodule DrawIt.Games.Round do
  use DrawIt.Schema
  import Ecto.Changeset
  import Ecto.Query

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

  def with_player_drawer(query) do
    from q in query,
      left_join: player_drawer in assoc(q, :player_drawer),
      preload: [player_drawer: player_drawer]
  end
end
