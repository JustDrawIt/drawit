defmodule DrawItApi.Context do
  @moduledoc """
  A plug which builds the GraphQL context for DrawItApi.

  If using with Phoenix, you should integrate it into your `:api` pipeline:

      pipeline :api do
        plug :accepts, ["json"]
        plug DrawItApi.Context
      end
  """

  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    context = build_context(conn)
    put_private(conn, :absinthe, %{context: context})
  end

  defp build_context(_conn) do
    %{}
  end
end
