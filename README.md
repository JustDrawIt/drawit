# Draw It!

> Draw It! is a multiplayer online game where you try to guess what your friends are drawing.

## Team

- __Product Owner__: Jelani Hankins
- __Scrum Master__: Cain Watson
- __Development Team Members__: Jelani Hankins, Cain Watson, Eric O'Neal

## Requirements

- Node 10
- Elixir 1.10.3 (Erlang 22.0)
- PostgresSQL 10.2

### Roadmap

View the project roadmap [here](https://github.com/JustDrawIt/drawit/issues)

## Contributing

See [CONTRIBUTING.md](/docs/CONTRIBUTING.md) for contribution guidelines.

### Getting started

```sh
cd client/
npm install # installs client dependencies
npm start # start client webpack server

cd server/
mix deps.get # install dependencies
mix test # run tests
mix test.watch # run test in watch mode
mix phx.server # run server
iex -S mix phx.server # runs server with iex
```
