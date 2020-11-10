defmodule DrawItWeb.Router do
  @moduledoc "The `Phoenix.Router` for `DrawItWeb`"

  use DrawItWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", DrawItWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", DrawItWeb do
    pipe_through :api

    resources "/games", GameController, except: [:new, :edit] do
      resources "/players", PlayerController, except: [:new, :edit]
      resources "/rounds", RoundController, except: [:new, :edit]
    end
  end

  # History fallback
  scope "/", DrawItWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
