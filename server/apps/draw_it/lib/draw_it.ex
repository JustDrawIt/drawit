defmodule DrawIt do
  @moduledoc """
  The core Elixir application for `DrawIt`, containing all the contexts that
  define your domain and business logic.

  ## Contexts

  `DrawIt` is divided into **contexts**, which can be thought of as features or
  groups of closely related features.

  - Each context defines a single module with a public API.

  - All other modules within the context are private and must never be called from
    outside the context.

  - Each context manages its own data and persistence, regardless if it comes from
  the database, an external API, or others.

  - Each domain only interacts with other contexts through their public API
  functions.

  `DrawIt` provides the following contexts:

  - TODO: list contexts here

  ## Supporting Applications

  The `DrawIt` platform also contains supporting applications.

  - `DrawItWeb`: A lightweight Phoenix application which handles HTTP and
  Websocket requests.

  - `DrawItApi`: Provides a GraphQL API, which is mounted inside the `draw_it_web` app's router.
  """
end
