defmodule DrawIt.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      DrawIt.Repo,
      {Registry, [keys: :unique, name: :game_server_registry]},
      # Start the Endpoint (http/https)
      DrawItWeb.Endpoint,
      # Start the Telemetry supervisor
      # DrawItWeb.Telemetry,
      # Start the PubSub system
      # {Phoenix.PubSub, name: DrawIt.PubSub},
      # Start a worker by calling: DrawIt.Worker.start_link(arg)
      # {DrawIt.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: DrawIt.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    DrawItWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
