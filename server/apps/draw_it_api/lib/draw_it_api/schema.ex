defmodule DrawItApi.Schema do
  @moduledoc """
  A GraphQL schema for DrawIt. For more info see:
  https://hexdocs.pm/absinthe/Absinthe.html
  """

  use Absinthe.Schema

  query do
    description """
    The following queries can be performed against this GraphQL API.

    Many require an authentication token to be passed in the
    `Authorization` header. This will be noted in the docs for each
    query, when relevant.

    See the `login` mutation for how to create these tokens.
    """
  end

  mutation do
    description """
    The following mutations can be performed against this GraphQL API.

    Many require an authentication token to be passed in the
    `Authorization` header. This will be noted in the docs for each
    mutation, when relevant.

    See the `login` mutation for how to create these tokens.
    """
  end

  # Apply the HandleErrors middleware on every query, subscription or mutation
  # so that resolver functions don't have to handle their own errors.
  #
  # This is very similar to `action_fallback` in Phoenix.
  def middleware(middleware, _field, %Absinthe.Type.Object{identifier: identifier})
      when identifier in [:query, :subscription, :mutation] do
    middleware ++ [DrawItApi.Middleware.HandleErrors]
  end

  def middleware(middleware, _field, _object) do
    middleware
  end
end
