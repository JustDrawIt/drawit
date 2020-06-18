defmodule DrawIt.GameServer do
  use GenServer

  require Logger

  alias DrawIt.Games

  @server_registry_name :game_server_registry

  defmodule State do
    defstruct game: nil,
              current_round: nil,
              player_ids_joined: [],
              player_ids_drawn: []
  end

  ##
  # Client
  ##

  def start_link(options) do
    game = Keyword.fetch!(options, :game)
    name = via_tuple(game.join_code)

    GenServer.start_link(__MODULE__, %State{game: game}, name: name)
  end

  defp via_tuple(join_code), do: {:via, Registry, {@server_registry_name, join_code}}

  def join(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:join, payload})
  end

  def start_round(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:start_round, payload})
  end

  def end_round(join_code, payload) do
    GenServer.call(via_tuple(join_code), {:end_round, payload})
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
    state = %State{
      game: Keyword.fetch!(options, :game)
    }

    {:ok, state}
  end

  @impl true
  def handle_call({:join, %{nickname: nickname}}, _from, %State{} = state) do
    player = find_or_create_player(state.game, nickname)
    updated_game = Games.get_game!(state.game.id)
    player_ids_joined = add_joined_player(state.player_ids_joined, player)

    new_state = %State{
      state
      | game: updated_game,
        player_ids_joined: player_ids_joined
    }

    {:reply, {:ok, player}, new_state}
  end

  @impl true
  def handle_call({:start_round, _payload}, _from, %State{current_round: nil} = state) do
    id_player_drawer = Enum.random(state.player_ids_joined)
    word = "house"

    {:ok, round} =
      Games.create_round(%{
        id_game: state.game.id,
        id_player_drawer: id_player_drawer,
        word: word
      })

    game = Games.get_game!(state.game.id)

    new_state = %State{
      state
      | game: game,
        current_round: round
    }

    {:reply, {:ok, round}, new_state}
  end

  def handle_call({:start_round, _payload}, _from, %State{current_round: %Games.Round{}} = state) do
    {:reply, {:error, :already_started}, state}
  end

  @impl true
  def handle_call({:end_round, _payload}, _from, %State{} = state) do
    new_state = %State{
      state
      | current_round: nil
    }

    {:reply, :ok, new_state}
  end

  ##
  # Server Helpers
  ##

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
end
