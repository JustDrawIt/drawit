defmodule DrawItApi.DataCase do
  @moduledoc """
  An ExUnit.CaseTemplate which starts up `DrawIt.Repo` properly
  so that tests can be run which call it.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      import DrawItApi, only: [run: 1, run: 2]
      import DrawItApi.DataCase
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(DrawIt.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(DrawIt.Repo, {:shared, self()})
    end

    :ok
  end
end
