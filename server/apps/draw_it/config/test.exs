use Mix.Config

# Configure database for test mode
config :draw_it, DrawIt.Repo,
  username: System.get_env("POSTGRES_USERNAME", "postgres"),
  password: System.get_env("POSTGRES_PASSWORD", "postgres"),
  database: System.get_env("POSTGRES_DATABASE", "draw_it_test"),
  hostname: System.get_env("POSTGRES_HOST", "localhost"),
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

config :draw_it, DrawIt.GameServer, end_round_timeout: 10
