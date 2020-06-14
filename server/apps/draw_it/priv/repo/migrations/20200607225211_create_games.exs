defmodule DrawIt.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :join_code, :string
      add :max_players, :integer
      add :max_rounds, :integer

      timestamps(inserted_at: :date_inserted, updated_at: :date_updated)
    end
  end
end
