# Server Environment Variables

The server uses __dotenv__, a npm package for separating environment variables into a non-commited file.

Inside the root of this project create a __.env__ file and place any envs necessary to the projects inside.

```sh
touch .env
```

## Variables
```
MONGODB=mongo_uri
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
SESSION_SECRET=youre_secret
```

## Config
A [config.js](/server/config.js) has been created to manage the environment variables across the server. Use it to import any variables you need.
