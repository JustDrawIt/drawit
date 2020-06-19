defmodule DrawItWeb.GameChannel do
  @moduledoc """
  The Phoenix channel used for all game events.
  """

  use Phoenix.Channel

  require Logger

  alias DrawIt.Games
  alias DrawIt.GameServer
  alias DrawItWeb.PlayerView

  @end_round_timeout 5000

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

    {:ok, correct?} = GameServer.guess(join_code, %{guess: text})

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

  def handle_in("round:start", _message, socket) do
    "game:" <> join_code = socket.topic
    start_round_and_schedule_end!(join_code, socket)

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

  def handle_info(:round_end, socket) do
    "game:" <> join_code = socket.topic
    :ok = GameServer.end_round(join_code, %{})

    broadcast!(socket, "round:end", %{})

    broadcast!(socket, "new_message", %{
      text: "Round ended"
    })

    game = Games.get_game_by_join_code!(join_code)

    if length(game.rounds) < game.max_rounds do
      Process.send_after(self(), :next_round, @end_round_timeout)
    end

    {:noreply, socket}
  end

  def handle_info(:next_round, socket) do
    "game:" <> join_code = socket.topic
    start_round_and_schedule_end!(join_code, socket)

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
    Logger.info("Socket terminating '#{socket.topic}' for reason: #{reason}")
  end

  defp start_round_and_schedule_end!(join_code, socket) do
    {:ok, round} = GameServer.start_round(join_code, %{})

    broadcast!(socket, "round:start", %{
      round: DrawItWeb.RoundView.render("round.json", %{round: round})
    })

    broadcast!(socket, "new_message", %{
      text: "Round started, #{round.player_drawer.nickname} is drawing"
    })

    game = Games.get_game_by_join_code!(join_code)
    Process.send_after(self(), :round_end, game.round_length_ms)
  end
end
