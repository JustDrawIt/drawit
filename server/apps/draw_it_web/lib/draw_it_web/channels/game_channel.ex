defmodule DrawItWeb.GameChannel do
  use Phoenix.Channel

  alias DrawIt.Games

  def join("game:" <> join_code, message, socket) do
  end
end
