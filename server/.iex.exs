alias DrawIt.Repo
alias DrawIt.Games
alias DrawIt.Games.{Game, Round, Player}
alias DrawIt.GameServer

alias DrawItWeb.{GameController, PlayerController, RoundController}
alias DrawItWeb.{GameView, PlayerView, RoundView}
alias DrawItWeb.{UserSocket, GameChannel}

# {:ok, game} =
#   Games.create_game(%{
#     max_players: 3,
#     max_rounds: 2
#   })

# %{join_code: join_code} = game

# {:ok, server} = GameServer.start_link(game: game)

# name = {:via, Registry, {:game_server_registry, join_code}}
# IO.inspect(Registry.lookup(:game_server_registry, join_code))

# {:ok, player1_id} =
#   GameServer.join(join_code, %{
#     nickname: "p1",
#     token: "test token"
#   })

# {:ok, player2_id} =
#   GameServer.join(join_code, %{
#     nickname: "p2",
#     token: "test token"
#   })

# {:ok, player3_id} =
#   GameServer.join(join_code, %{
#     nickname: "p3",
#     token: "test token"
#   })

# game = Games.get_game!(game.id)
# [p3, p2, p1] = game.players

# {:ok, _round_id} =
#     GameServer.start_round(join_code, %{
#       player: p1
#     })

# {:ok, _} =
#     GameServer.guess(join_code, %{
#       player: p2,
#       guess: "turtle",
#     })
