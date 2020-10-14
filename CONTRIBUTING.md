# Contributing

## Overview

This repo contains:

- `server/`: An Elixir umbrella project containing a Phoenix REST server
- `client/`: A React client using hooks

## Getting Started

### Server

To start the server, you will need the following tools installed:

- Elixir 1.11.0, install [here](https://elixir-lang.org/install.html)
- Erlang 23.1, install [here](https://www.erlang.org/downloads)
- PostgreSQL 10.2, install [here](https://www.postgresql.org/download/)

Once those are installed, we'll need to do a few setup tasks. Make sure to run any commands in the `server/` directory.

- Install the application dependencies:

  ```sh
  mix deps.get
  ```

- Create the database tables, migrate them, and add the seed data:

  ```sh
  mix ecto.setup
  ```

  _Tip: If you need to reset the database can you run: `mix ecto.reset`. Also run `mix help` for a list of all the available commands._

- Finally, we can start the server by running:

  ```sh
  mix phx.server
  ```

- And run the tests from the `test/` directory by running:

  ```sh
  mix test
  ```

  _Tip: Use `mix test.watch` to re-run the tests every time you save._

### Client

To start developing the client, you will need the following tools installed:

- Node 14.12.0, install [here](https://nodejs.org/en/download/)

Once you've installed these, run the following commands in the `client/` directory.

- Install the client dependencies:

  ```sh
  npm install
  ```

- Now start the client development server:

  ```sh
  npm start
  ```

  You can now view the client by visiting the localhost url the command outputs in your browser.
