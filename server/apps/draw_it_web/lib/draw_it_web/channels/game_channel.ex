defmodule DrawItWeb.GameChannel do
  @moduledoc """
  The Phoenix channel used for all game events.
  """

  use Phoenix.Channel

  require Logger

  alias DrawIt.Games
  alias DrawIt.GameServer
  alias DrawItWeb.PlayerView

  def join("game:" <> join_code, %{"nickname" => nickname}, socket) do
    server = GameServer.whereis(join_code)

    if !server do
      game = Games.get_game_by_join_code!(join_code)
      {:ok, _pid} = GameServer.start_link(game: game)
    end

    case GameServer.join(join_code, %{nickname: nickname}) do
      {:ok, player} ->
        send(self(), :after_join)

        {:ok, assign(socket, :player, player)}

      {:error, :reached_max_players} ->
        {:error, :reached_max_players}
    end
  end

  def handle_in("new_message", %{"text" => text}, socket) do
    "game:" <> join_code = socket.topic

    {:ok, correct?} = GameServer.guess(join_code, %{guess: text, player: socket.assigns.player})

    if correct? do
      push(socket, "correct_guess", %{})
    else
      broadcast!(socket, "new_message", %{
        text: text,
        player: PlayerView.render("player.json", %{player: socket.assigns.player})
      })
    end

    {:noreply, socket}
  end

  def handle_in("start", _message, socket) do
    "game:" <> join_code = socket.topic

    :ok =
      GameServer.start(join_code, %{
        from_pid: self()
      })

    {:noreply, socket}
  end

  def handle_in("draw", %{"drawings" => drawings}, socket) do
    broadcast!(socket, "draw", %{
      drawings: drawings
    })

    Logger.info("Drawing received and sent", amount: length(drawings))

    {:noreply, socket}
  end

  def handle_in("clear_drawings", _message, socket) do
    broadcast!(socket, "clear_drawings", %{})

    Logger.info("Clear drawings received and sent")

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast!(socket, "new_message", %{
      text: "#{socket.assigns.player.nickname} joined the game"
    })

    {:noreply, socket}
  end

  def handle_info({:round_started, %{round: round}}, socket) do
    broadcast!(socket, "start_round", %{
      round: DrawItWeb.RoundView.render("round.json", %{round: round})
    })

    broadcast!(socket, "new_message", %{
      text: "Round started, #{round.player_drawer.nickname} is drawing"
    })

    {:noreply, socket}
  end

  def handle_info({:round_ended, %{game: game, ended?: ended?}}, socket) do
    broadcast!(socket, "end_round", %{
      game: DrawItWeb.GameView.render("game.json", %{game: game}),
      ended: ended?
    })

    message = if ended?, do: "Game ended", else: "Round ended"

    broadcast!(socket, "new_message", %{
      text: message
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

  def terminate(reason, socket) do
    Logger.info("Socket terminating '#{socket.topic}' for reason: #{inspect(reason)}")
  end
end
