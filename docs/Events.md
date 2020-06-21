# Sockets

> Most of the communication to and from the client and server is through websockets using phoenix.js Here is an outline of all the emitters/listeners the client and server have:

## Server
> The server listeners are registered in [server/listeners/index.js](/server/apps/draw_it_web/lib/draw_it_web/channels/game_channel.ex).

- `new_message`
  - Listens for whenever a player wants send a message/make a guess
  - Broadcasts `new_message` to everyone in the room
  - If a round has started and the guess is correct, `correct_guess` is instead pushed to the player socket
- `start_round`
  - Listens for whenever the host wants to start the first round
- `draw`
  - Listens for whenever a player draws something
  - Broadcasts to `draw` everyone in the room
- `clear_drawings`
  - Listens for whenever a player clears their canvas
  - Broadcasts `clear_drawings` to everyone in the room

## Client
> The client websocket connection is started in [client/sockets.js](/client/sockets.js) and the listeners are registered on the components' componentDidMount lifecycle method.
> The `<ScreenGame />` component it a good example.

- `new_message`
  - Displays the message in the chat
- `correct_guess`
  - Disables sending a message to the chat
- `draw`
  - Puts the drawing on the canvas
- `clear_drawings`
  - Clears the canvas
- `start_round`
  - Enables the canvas for the drawer
- `end_round`
  - Re-enables the chat for drawer and displays the scoreboard to all
