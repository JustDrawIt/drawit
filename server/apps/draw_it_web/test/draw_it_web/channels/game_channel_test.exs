defmodule DrawItWeb.GameChannelTest do
  use DrawItWeb.ChannelCase

  alias DrawIt.Games

  @game_attrs %{
    max_players: 4,
    max_rounds: 4
  }
  @game_player_nicknames ["Alia", "Ghanima", "Leto II"]
  @current_player_nickname "Chani"

  def fixture(:game) do
    {:ok, game} = Games.create_game(@game_attrs)

    Enum.map(@game_player_nicknames, fn nickname ->
      {:ok, _player} = Games.create_player(%{id_game: game.id, nickname: nickname})
    end)

    game
  end

  def join_game(socket_id, join_code, payload \\ %{}, assigns \\ %{}) do
    DrawItWeb.UserSocket
    |> socket(socket_id, assigns)
    |> subscribe_and_join(DrawItWeb.GameChannel, "game:#{join_code}", payload)
  end

  describe "join 'game:<join_code>'" do
    setup [:create_and_join_game]
  end

  describe "'new_message'" do
    setup [:create_and_join_game]

    test "broadcasts new_message", %{socket: socket, current_player: current_player} do
      text = "Hello!"
      player = DrawItWeb.PlayerView.render("player.json", %{player: current_player})
      push(socket, "new_message", %{text: text})
      assert_broadcast "new_message", %{text: ^text, player: ^player}
    end
  end

  describe "round_start" do
    setup [:create_and_join_game]
  end

  describe "round_draw" do
    setup [:create_and_join_game]
  end

  describe "terminate" do
    setup [:create_and_join_game]

    test "broadcasts new_message on leave", %{socket: socket} do
      Process.unlink(socket.channel_pid)
      leave(socket)

      assert_broadcast "new_message", %{text: "#{@current_player_nickname} left the game"}
    end

    test "brodcasts new_message on disconnect", %{socket: socket} do
      Process.unlink(socket.channel_pid)
      :ok = close(socket)

      assert_broadcast "new_message", %{text: "#{@current_player_nickname} disconnected"}
    end
  end

  defp create_and_join_game(_) do
    game = fixture(:game)

    {:ok, _reply, socket} =
      join_game("test_user_id", game.join_code, %{
        nickname: @current_player_nickname
      })

    game = Games.get_game!(game.id)
    current_player = Enum.find(game.players, &(&1.nickname == @current_player_nickname))

    {:ok, socket: socket, game: game, current_player: current_player}
  end
end
