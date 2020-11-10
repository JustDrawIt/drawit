defmodule DrawIt.Repo.Migrations.AddGamePlayersToken do
  use Ecto.Migration

  def change do
    alter table(:game_players) do
      add :token, :string, null: false
    end
  end
end
