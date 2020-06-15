# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# General application configuration
config :draw_it_web,
  ecto_repos: [DrawIt.Repo],
  generators: [context_app: :draw_it]

# Configures the endpoint
config :draw_it_web, DrawItWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "i7VAZmXVLl9qndnB9mD9dyQWk37OcTeOnHkQhKsvhoICoeWzq/qUhnyqMBLg0BLk",
  render_errors: [view: DrawItWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub: [name: DrawItWeb.PubSub, adapter: Phoenix.PubSub.PG2]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
