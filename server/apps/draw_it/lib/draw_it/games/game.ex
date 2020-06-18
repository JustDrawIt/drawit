defmodule DrawIt.Games.Game do
  use DrawIt.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias DrawIt.Games.{Round, Player}

  schema "games" do
    field :join_code, :string
    field :max_players, :integer, default: 3
    field :max_rounds, :integer, default: 5
    field :round_length_ms, :integer, default: 60000

    has_many :rounds, Round, foreign_key: :id_game
    has_many :players, Player, foreign_key: :id_game

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:join_code, :max_players, :max_rounds, :round_length_ms])
    |> validate_required([:join_code])
    |> validate_number(:max_players, less_than_or_equal_to: 20, greater_than: 1)
    |> validate_number(:max_rounds, less_than_or_equal_to: 25, greater_than: 0)
    |> validate_number(:round_length_ms, less_than_or_equal_to: 60000 * 5)
  end

  def with_players(query) do
    from q in query,
      left_join: players in assoc(q, :players),
      preload: [players: players]
  end

  def with_rounds(query) do
    from q in query,
      left_join: rounds in assoc(q, :rounds),
      preload: [rounds: rounds]
  end
end
