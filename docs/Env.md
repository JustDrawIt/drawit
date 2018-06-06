The server uses __dotenv__, a npm package for separating environment variables into a non-commited file.

Inside the root of this project create a __.env__ file and place any envs necessary to the projects inside. For example:

```sh
echo MONGODB=your_mongodb_uri_here > .env
```

## Variables
```
MONGODB=mongo_uri
```

## Config
A [config.js](server/config.js) has been created to manage the environment variables across the server. Use it to import any variables you need in the server.
