defmodule DrawIt.Repo.Migrations.AddGameLanguage do
  use Ecto.Migration

  def change do
    alter table(:games) do
      add :language, :string, null: false, size: 2, default: "en"
    end
  end
end
