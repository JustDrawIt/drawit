defmodule DrawIt.Repo.Migrations.CreateGames do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :join_code, :string
      add :max_players, :integer
      add :max_rounds, :integer

      timestamps()
    end
  end
end
