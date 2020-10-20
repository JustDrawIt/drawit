defmodule DrawIt.Repo.Migrations.CreateGameRounds do
  use Ecto.Migration

  def change do
    create table(:game_rounds) do
      add :id_game, references(:games, on_delete: :delete_all)
      add :id_player_drawer, references(:game_players, on_delete: :delete_all)
      add :word, :string

      timestamps(inserted_at: :date_inserted, updated_at: :date_updated)
    end

    create index(:game_rounds, [:id_game])
  end
end
