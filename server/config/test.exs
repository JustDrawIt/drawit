use Mix.Config

# Print only warnings and errors during test
config :logger, level: :warn

# Configure database for test mode
config :draw_it, DrawIt.Repo,
  username: System.get_env("POSTGRES_USERNAME", "postgres"),
  password: System.get_env("POSTGRES_PASSWORD", "postgres"),
  database: System.get_env("POSTGRES_DATABASE", "draw_it_test"),
  hostname: System.get_env("POSTGRES_HOST", "localhost"),
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

config :draw_it, DrawIt.GameServer, end_round_timeout: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :draw_it, DrawItWeb.Endpoint,
  http: [port: 4001],
  server: false
