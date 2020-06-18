defmodule DrawIt.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      DrawIt.Repo,
      {Registry, [keys: :unique, name: :game_server_registry]}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: DrawIt.Supervisor)
  end
end
