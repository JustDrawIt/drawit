use Mix.Config

# Configure your database for dev
config :draw_it, DrawIt.Repo,
  username: "postgres",
  password: "postgres",
  database: "draw_it_dev",
  hostname: "localhost",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10
