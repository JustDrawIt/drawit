# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     DrawIt.Factory.insert!(%DrawIt.SomeSchema{})

# alias DrawIt.Factory, warn: false

alias DrawIt.Games

{:ok, game1} =
  Games.create_game(%{
    max_rounds: 3,
    max_player: 3
  })

{:ok, game1_player1} =
  Games.create_player(%{
    id_game: game1.id,
    nickname: "Octavia"
  })

{:ok, game1_player2} =
  Games.create_player(%{
    id_game: game1.id,
    nickname: "Lauren"
  })

{:ok, game1_player3} =
  Games.create_player(%{
    id_game: game1.id,
    nickname: "Cory"
  })

{:ok, _game1_round1} =
  Games.create_round(%{
    id_game: game1.id,
    id_player_drawer: game1_player1.id,
    word: "book"
  })

{:ok, _game1_round2} =
  Games.create_round(%{
    id_game: game1.id,
    id_player_drawer: game1_player2.id,
    word: "wall"
  })

_game1_round3 =
  Games.create_round(%{
    id_game: game1.id,
    id_player_drawer: game1_player3.id,
    word: "plant"
  })
