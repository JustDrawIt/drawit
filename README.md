# Draw It!

> Draw It! is a multiplayer online game where you try to guess what your friends are drawing.

## Team

  - __Product Owner__: Jelani Hankins
  - __Scrum Master__: Cain Watson
  - __Development Team Members__: Jelani Hankins, Cain Watson, Eric O'Neal

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> This projects uses
  - React
  - Express
  - SocketIO
  - MongoDB
  - Mongoose

## Requirements

- Node 8.x
- Mongo 3.x

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

The server uses __dotenv__, a npm package for separating environment variables into a non-commited file. Inside the root of this project create a __.env__ file and place any envs necessary to the projects inside. For example:

```sh
echo MONGODB=your_mongodb_uri_here > .env
```

### NPM Scripts
```sh
npm run dev:server # start server with nodemon
npm run dev:client # start client webpack server
npm run test:server # run server tests
npm run test:client # run client tests
```

### Roadmap

View the project roadmap [here](https://github.com/JustDrawIt/drawit/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
