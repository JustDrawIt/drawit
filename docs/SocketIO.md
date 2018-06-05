Most of the communication to and from the client and server is through websockets using SocketIO.

Here is an outline of all the emitters/listeners the client and server have.

---
## Server
> The server listeners are registered in [server/listeners/index.js](server/listeners/index.js)

### game
- _game:join_

### round
- _round:draw_
- _round:guess_
- _round:start_

---
## Client
> The client listeners are registered in [client/sockets.js](client/sockets.js)

### game
- _game:end_
- _game:joined_
- _game:not_joined_

### round
- _round:correct_guess_
- _round:incorrect_guess_
- _round:drew_
- _round:end_
- _round:error_

---
