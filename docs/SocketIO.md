Most of the communication to and from the client and server is through websockets using SocketIO.

Here is an outline of all the emitters/listeners the client and server have.

---
## Server
> The server listeners are registered in [server/listeners/index.js](/server/listeners/index.js)

### game
* #### game:join
  - Listens for whenever a socket wants to join a room.
  - Emits [game:joined](#game:joined) to __everyone in the room__ on _success_
  - Emits [game:not_joined](#game:not_joined) to __the socket__ on _failure_

### round
* #### round:draw
  - Listens for whenever a socket wants to tell everyone else in the room what they drew.
  - Emits [round:drew](#round:drew) to __everyone in the room__

* #### round:guess
  - Listens for whenever a socket wants to guess the round's word.
  - Emits [round:correct_guess](#round:correct_guess) to __everyone in the room__ if the message matches the round's word
  - Emits [round:incorrect_guess](#round:incorrect_guess) to __everyone in the room__ if the message does not match the round's word

* #### round:clear
  - Listens for whenever a socket wants to tell everyone else to clear their canvas
  - Emits [round:cleared](#round:cleared) to __everyone in the room__

* #### round:start
  - Listens for whenever an admin socket wants to start the first round.
  - Emits [round:started](#round:started) to __everyone in the room__ on _success_
  - Emits [round:not_started](#round:not_started) to __the socket__ on _failure_

---
## Client
> The client websocket connection is started in [client/sockets.js](/client/sockets.js) and the listeners are registered on the components' componentDidMount lifecycle method

### game
* #### game:joined
  - Displays who joined to the chat.

* #### game:not_joined
  - Displays an error notification.


### round
* #### round:drew
  - Displays the item drawn to the canvas

* #### round:correct_guess
  - Disables sending a message to the chat.

* #### round:incorrect_guess
  - Displays the guess to the chat.

* #### round:cleared
  - Clears the canvas.

* #### round:started
  - Resets the round state.

* #### round:not_started
  - Displays an error notification

* #### round:chosen
  - Displays the word on the topbar, enables the canvas, and disables the chat.
---
