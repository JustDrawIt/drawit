defmodule DrawIt.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :join_code, :string
      add :max_players, :integer
      add :max_rounds, :integer
      add :round_length_ms, :integer

      timestamps(inserted_at: :date_inserted, updated_at: :date_updated)
    end

    create index(:games, [:join_code])
  end
end
