use Mix.Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise """
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """

pool_size = String.to_integer(System.get_env("POOL_SIZE") || "10")

# Configure your database for prod
config :draw_it, DrawIt.Repo,
  ssl: true,
  url: database_url,
  pool_size: pool_size

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

port = System.get_env("PORT")
host = System.get_env("HOST")

config :draw_it, DrawItWeb.Endpoint,
  http: [port: port],
  url: [scheme: "https", host: host, port: port],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true,
  secret_key_base: secret_key_base,
  root: ".",
  version: Application.spec(:draw_it, :vsn)
