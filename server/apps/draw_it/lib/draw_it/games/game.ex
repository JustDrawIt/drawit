defmodule DrawIt.Games.Game do
  use Ecto.Schema
  import Ecto.Changeset

  schema "games" do
    field :join_code, :string
    field :max_players, :integer, default: 3
    field :max_rounds, :integer, default: 5

    timestamps()
  end

  @doc false
  def changeset(game, attrs) do
    game
    |> cast(attrs, [:join_code, :max_players, :max_rounds])
    |> validate_required([:join_code, :max_players, :max_rounds])
    |> validate_number(:max_players, less_than_or_equal_to: 20, greater_than: 1)
    |> validate_number(:max_rounds, less_than_or_equal_to: 25, greater_than: 0)
  end
end
