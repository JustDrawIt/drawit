defmodule DrawIt.Schema do
  @moduledoc """
  Define commonly used imports for all `Ecto.Schema`s here.

  ## Example

      defmodule DrawIt.Context.Schema do
        use DrawIt.Schema
      end
  """

  @doc false
  defmacro __using__(_) do
    quote do
      use Ecto.Schema

      import Ecto.Changeset, warn: false
      import DrawIt.Schema, warn: false
    end
  end

  # Define any functions you want to be available in all your
  # Ecto.Schemas here
end
