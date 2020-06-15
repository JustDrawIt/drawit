defmodule DrawItWeb.GameChannel do
  use Phoenix.Channel

  alias DrawIt.Games

  def join("game:" <> join_code, %{"nickname" => nickname}, socket) do
    game = Games.get_game_by_join_code!(join_code)
    existing_player = Enum.find(game.players, fn player -> player.nickname == nickname end)

    # TODO: confirm token

    if existing_player do
      send(self(), :after_join)
      {:ok, assign(socket, :player, existing_player)}
    else
      # TODO: check max players

      {:ok, player} = Games.create_player(%{id_game: game.id, nickname: nickname})

      send(self(), :after_join)
      {:ok, assign(socket, :player, player)}
    end
  end

  def handle_info(:after_join, socket) do
    broadcast!(socket, "new_message", %{
      text: "#{socket.assigns.player.nickname} joined the game"
    })

    {:noreply, socket}
  end

  def handle_in("new_message", %{"text" => text}, socket) do
    broadcast!(socket, "new_message", %{
      text: text,
      player: DrawItWeb.PlayerView.render("player.json", %{player: socket.assigns.player})
    })

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
