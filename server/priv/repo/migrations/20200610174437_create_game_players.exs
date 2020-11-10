defmodule DrawIt.Repo.Migrations.CreateGamePlayers do
  use Ecto.Migration

  def change do
    create table(:game_players) do
      add :id_game, references(:games, on_delete: :delete_all)
      add :nickname, :string
      add :score, :integer

      timestamps(inserted_at: :date_inserted, updated_at: :date_updated)
    end

    create index(:game_players, [:id_game])
  end
end
