defmodule DrawIt.GameServer do
  @moduledoc """
  A `GenServer` used for managing a game's state.

  To create a game server, start by passing an existing `%DrawIt.Games.Game{}`
  into `start_link/1`.

      {:ok, game} = Games.create_game(%{})
      {:ok, server} = GameServer.start_link(game: game)

  Once the server is created, you can use the returned server pid or the game's
  join_code to interact with the game server.

      {:ok, player1} = GameServer.join(server, %{nickname: "Ben"})
      {:ok, player2} = GameServer.join(game.join_code, %{nickname: "Wendy"})

  Check the docs for `start/2` for starting the game.
  """

  use GenServer

  require Logger

  alias DrawIt.Games
  alias DrawIt.RandomWords

  @server_registry_name :game_server_registry

  defmodule State do
    @moduledoc """
    This module defines a struct that represents the game state for `GameServer`.
    """

    defstruct game: nil,
              current_round: nil,
              player_ids_joined: [],
              player_ids_drawn: [],
              player_ids_correct_guess: [],
              start_round_ref: nil,
              end_round_ref: nil,
              end_round_timeout: 5000
  end

  ##
  # Client
  ##

  def start_link(options) do
    game = Keyword.fetch!(options, :game)
    name = via_tuple(game.join_code)

    GenServer.start_link(__MODULE__, options, name: name)
  end

  defp via_tuple(join_code), do: {:via, Registry, {@server_registry_name, join_code}}

  def join(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:join, payload})
  end

  def leave(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:leave, payload})
  end

  @doc """
  Starts the game by creating the first round and scheduling ending it (ending
  will schedule the next round, and so on until the max rounds are reached).

  Expects to be given a PID as the `:from_pid` key in the payload map. This PID is
  used to receive the `{:round_started, payload}` and `{:round_ended, payload}` events.

  ## Examples

      :ok = GameServer.start(game.join_code, %{from_pid: self()})

      # Basic receive:
      receive do
        {:round_started, %{round: round} -> ...
        {:round_ended, %{game: game, ended?: ended?}} -> ...
      end

      # Receive from GenServer (for example a Phoenix Channel):
      def handle_info({:round_started, %{round: round}}, socket) do
        ...
        {:noreply, socket}
      end

      def handle_info({:round_ended, %{game: game, ended?: ended?}}, socket) do
        ...
        {:noreply, socket}
      end
  """
  def start(join_code, payload) do
    send(whereis(join_code), {:start_round, payload})
    :ok
  end

  def guess(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:guess, payload})
  end

  def whereis(join_code) do
    case Registry.lookup(@server_registry_name, join_code) do
      [{pid, _}] -> pid
      [] -> nil
    end
  end

  ##
  # Server
  ##

  @impl true
  def init(options \\ []) do
    config = Application.get_env(:draw_it, __MODULE__, [])
    end_round_timeout = Keyword.get(config, :end_round_timeout, 5000)

    state = %State{
      game: Keyword.fetch!(options, :game),
      end_round_timeout: end_round_timeout
    }

    set_logger_metadata(state)
    Logger.info("Game server created")

    {:ok, state}
  end

  @impl true
  def handle_call({:join, %{nickname: nickname} = join_params}, _from, %State{} = state) do
    set_logger_metadata(state)

    if reached_max_players_joined?(state.game, state.player_ids_joined) do
      Logger.info("Attempted to join, but already reached max players", player: nickname)
      {:reply, {:error, :reached_max_players}, state}
    else
      if nickname_taken?(nickname, state) do
        Logger.info("Attempted to join, but nickname was taken", player: nickname)
        {:reply, {:error, :nickname_taken}, state}
      else
        player = find_or_create_player(state.game, nickname)

        rejoining? = Enum.any?(state.game.players, &(&1.nickname == nickname))
        valid_rejoin_token? = Map.get(join_params, :token) == player.token

        if rejoining? && !valid_rejoin_token? do
          {:reply, {:error, :invalid_token}, state}
        else
          Logger.info("Player joined", player: nickname)

          updated_game = Games.get_game!(state.game.id)
          player_ids_joined = add_joined_player(state.player_ids_joined, player)

          {:reply, {:ok, player},
           %State{
             state
             | game: updated_game,
               player_ids_joined: player_ids_joined
           }}
        end
      end
    end
  end

  def handle_call({:leave, %{player: player}}, _from, %State{} = state) do
    set_logger_metadata(state)

    joined? = player.id in state.player_ids_joined

    if joined? do
      Logger.info("Player left", player: player.nickname)

      {:reply, :ok,
       %State{
         state
         | player_ids_joined: Enum.reject(state.player_ids_joined, &(&1 == player.id))
       }}
    else
      Logger.info("Attempted to leave, but player wasn't joined", player: player.nickname)
      {:reply, {:error, :not_joined}, state}
    end
  end

  def handle_call({:guess, %{player: player}}, _from, %State{current_round: nil} = state) do
    set_logger_metadata(state)
    Logger.info("Guess made, but round not started", player: player.nickname)

    {:reply, {:ok, false}, state}
  end

  def handle_call(
        {:guess, %{player: player, guess: guess}},
        {from_pid, _from_tag},
        %State{current_round: current_round} = state
      ) do
    set_logger_metadata(state)
    Logger.info("Guess", correct_word: current_round.word, guess: guess, player_id: player.id)

    correct? = correct_guess?(guess, current_round.word)
    already_guessed? = player.id in state.player_ids_correct_guess

    if !already_guessed? && correct? do
      player = Games.get_player!(player.id)

      Games.update_player(player, %{
        score: player.score + 1
      })

      player_ids_correct_guess = [player.id | state.player_ids_correct_guess]

      # Subtract 1 to discard drawer
      everyone_guessed_correct? =
        length(player_ids_correct_guess) == length(state.player_ids_joined) - 1

      end_round_ref =
        if everyone_guessed_correct? do
          :ok = Process.cancel_timer(state.end_round_ref, info: false)
          send(self(), {:end_round, %{from_pid: from_pid}})
          nil
        else
          state.end_round_ref
        end

      {:reply, {:ok, correct?},
       %State{
         state
         | player_ids_correct_guess: player_ids_correct_guess,
           end_round_ref: end_round_ref
       }}
    else
      {:reply, {:ok, correct?}, state}
    end
  end

  @impl true
  def handle_info({:start_round, _payload}, %State{current_round: %Games.Round{}} = state) do
    set_logger_metadata(state)
    Logger.info("Attempted to start round, but a round was already started")
    {:noreply, state}
  end

  def handle_info({:start_round, payload}, %State{current_round: nil} = state) do
    set_logger_metadata(state)

    if reached_max_rounds?(state.game) do
      Logger.info("Attempted to start round, but already reached max rounds")
      {:noreply, state}
    else
      {id_player_drawer, player_ids_joined} =
        select_drawer(state.player_ids_drawn, state.player_ids_joined)

      word = RandomWords.word(:easy)

      {:ok, round} =
        Games.create_round(%{
          id_game: state.game.id,
          id_player_drawer: id_player_drawer,
          word: word
        })

      send(payload.from_pid, {:round_started, %{round: round}})

      end_round_ref =
        Process.send_after(self(), {:end_round, payload}, state.game.round_length_ms)

      Logger.info("Round started #{inspect(self())}", round_id: round.id)

      {:noreply,
       %State{
         state
         | game: Games.get_game!(state.game.id),
           current_round: round,
           player_ids_drawn: player_ids_joined,
           end_round_ref: end_round_ref,
           start_round_ref: nil
       }}
    end
  end

  def handle_info({:end_round, payload}, %State{current_round: %Games.Round{}} = state) do
    set_logger_metadata(state)

    game = Games.get_game!(state.game.id)
    ended? = reached_max_rounds?(game)
    send(payload.from_pid, {:round_ended, %{game: game, ended?: ended?}})

    start_round_ref =
      if ended?,
        do: nil,
        else: Process.send_after(self(), {:start_round, payload}, state.end_round_timeout)

    Logger.info("Round ended", round_id: state.current_round.id)

    {:noreply,
     %State{
       state
       | game: game,
         current_round: nil,
         player_ids_correct_guess: [],
         start_round_ref: start_round_ref
     }}
  end

  ##
  # Server Helpers
  ##

  defp set_logger_metadata(%State{game: game}) do
    Logger.metadata(join_code: game.join_code)
  end

  defp find_or_create_player(game, nickname) do
    existing_player = Enum.find(game.players, &(&1.nickname == nickname))

    if existing_player do
      existing_player
    else
      {:ok, player} =
        Games.create_player(%{
          id_game: game.id,
          nickname: nickname
        })

      player
    end
  end

  defp add_joined_player(player_ids_joined, player) do
    already_joined? = Enum.any?(player_ids_joined, &(&1 == player.id))

    if already_joined? do
      player_ids_joined
    else
      [player.id | player_ids_joined]
    end
  end

  defp reached_max_players_joined?(%Games.Game{max_players: max_players}, player_ids_joined) do
    length(player_ids_joined) >= max_players
  end

  defp reached_max_rounds?(%Games.Game{rounds: rounds, max_rounds: max_rounds}) do
    length(rounds) >= max_rounds
  end

  defp nickname_taken?(nickname, %State{game: game, player_ids_joined: player_ids_joined}) do
    game.players
    |> Enum.filter(fn player -> player.id in player_ids_joined end)
    |> Enum.any?(fn player -> player.nickname == nickname end)
  end

  # Reset once everyone has drawn
  defp select_drawer(drawn, joined) when length(drawn) >= length(joined) do
    drawer = Enum.random(joined)
    {drawer, [drawer]}
  end

  defp select_drawer(drawn, joined) do
    drawer =
      joined
      |> Enum.reject(&(&1 in drawn))
      |> Enum.random()

    {drawer, [drawer | drawn]}
  end

  defp correct_guess?(guess, word) do
    word = String.downcase(word)

    guess
    |> String.downcase()
    |> String.contains?(word)
  end
end
