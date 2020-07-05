# Deployment

Currently, a GitHub Action (`.github/workflows/deploy.yml`) is setup to re-deploy when code is merged into master. The workflow checks if `:version` in `server/apps/draw_it/mix.exs` differs from the latest git tag, so you'll need to bump the version if you want the deployment to happen.

The workflow also uses the following secrets:
- `HEROKU_API_KEY`
- `HEROKU_APP_NAME`
- `HEROKU_EMAIL`

## Manual Redeploy

If you need to deploy locally and have access to the Heroku project you'll need to have Docker and the Heroku CLI installed.

In the repository root run the following commands:

```sh
heroku container:push web --arg APP_VSN=2.5.0
heroku container:release web
```
