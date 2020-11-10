defmodule DrawItWeb.PageController do
  use DrawItWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
