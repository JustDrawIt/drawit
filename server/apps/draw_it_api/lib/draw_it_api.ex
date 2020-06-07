defmodule DrawItApi do
  @moduledoc """
  A GraphQL API implemented with `Absinthe` and `AbsinthePlug`.

  It provides the following modules which can easily integrate with Phoenix or any other
  Plug-based HTTP endpoint.

  - `DrawItApi.Schema`: A pluggable GraphQL schema defining this
    API's GraphQL types, queries, and mutations.

  - `DrawItApi.Context`: A plug which sets up the proper GraphQL
    context on a query, based on the `Authorization` header in the request.

  - `Absinthe.Plug.GraphiQL`: A GraphiQL plug which can be used to serve GraphiQL at any
    url path of your choosing.

  ## Examples

  It's easy to use `DrawItApi.Schema` with a Phoenix router:

      pipeline :api do
        plug :accepts, ["json"]
        plug DrawItApi.Context
      end

      scope "/" do
        pipe_through :api

        forward "/api", Absinthe.Plug, schema: DrawItApi.Schema
        forward "/graphiql", Absinthe.Plug.GraphiQL, schema: DrawItApi.Schema
      end

  Also, if `DrawItApi` is set up to load a complex object
  graph, you can query it directly from your web framework using `run/2`.

      {:ok, %{data: %{"some_query" => %{"field" => value}}}} =
        DrawItApi.run(
          \"\"\"
          query some_query($id: ID!) {
            some_query(id: $id) {
              field
            }
          }
          \"\"\",
          variables: %{
            "id" => 123
          }
        )
  """

  @doc """
  Shortcut function to execute a GraphQL query against `DrawItApi.Schema`.

  ## Example

      {:ok, %{data: %{"some_query" => %{"field" => value}}}} =
        DrawIt.run(
          \"\"\"
          query some_query($id: ID!) {
            some_query(id: $id) {
              field
            }
          }
          \"\"\",
          variables: %{
            "id" => 123
          }
        )
  """
  @spec run(String.t(), Absinthe.run_opts()) :: Absinthe.run_result()
  def run(query, opts \\ []) do
    Absinthe.run(query, DrawItApi.Schema, opts)
  end
end
