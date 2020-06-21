# DrawIt

The Elixir backend for DrawIt.

## Architecture

DrawIt uses the
[Mithril](https://github.com/infinitered/mithril) code organization
conventions.

- `apps/draw_it` contains the business logic for the application.
  See its README and docs for details on its public API.
- `apps/draw_it_web` contains a simple Phoenix application, which
  wraps the business logic from `apps/draw_it`.
