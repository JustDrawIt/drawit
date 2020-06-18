defmodule DrawItWeb.GameChannel do
  use Phoenix.Channel

  alias DrawIt.Games
  alias DrawIt.GameServer

  @end_round_timeout 5000

  def join("game:" <> join_code, %{"nickname" => nickname}, socket) do
    {:ok, player} = GameServer.join(join_code, %{nickname: nickname})

    send(self(), :after_join)

    {:ok, assign(socket, :player, player)}
  end

  def handle_info(:after_join, socket) do
    broadcast!(socket, "new_message", %{
      text: "#{socket.assigns.player.nickname} joined the game"
    })

    {:noreply, socket}
  end

  def handle_in("new_message", %{"text" => text}, socket) do
    IO.inspect(socket)

    broadcast!(socket, "new_message", %{
      text: text,
      player: DrawItWeb.PlayerView.render("player.json", %{player: socket.assigns.player})
    })

    {:noreply, socket}
  end

  def handle_in("round:start", message, socket) do
    IO.inspect(socket)
    # GameServer.start_round(join_code, payload)

    {:noreply, socket}
  end

  def handle_in("round:draw", message, socket) do
    IO.inspect("-> 'round:draw', #{inspect(message)}")

    {:noreply, socket}
  end

  def terminate({:shutdown, :left}, socket) do
    broadcast!(socket, "new_message", %{
      text: "#{socket.assigns.player.nickname} left the game"
    })
  end

  def terminate({:shutdown, :closed}, socket) do
    broadcast!(socket, "new_message", %{
      text: "#{socket.assigns.player.nickname} disconnected"
    })
  end
end
