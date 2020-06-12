defmodule DrawItWeb.Router do
  @moduledoc "The `Phoenix.Router` for `DrawItWeb`"

  use DrawItWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", DrawItWeb do
    pipe_through :api

    resources "/games", GameController, except: [:new, :edit] do
      resources "/players", PlayerController, except: [:new, :edit]
    end
  end
end
