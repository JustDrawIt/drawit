use Mix.Config

# Configure database for test mode
config :draw_it, DrawIt.Repo,
  username: "postgres",
  password: "postgres",
  database: "draw_it_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10
