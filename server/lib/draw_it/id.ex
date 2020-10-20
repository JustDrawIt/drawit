defmodule DrawIt.Id do
  @moduledoc """
  This module exposes a `generate/0` method for creating unique ids.

  ## Examples

      iex> generate()
      "YghmwYvDCTo3b1iMK1tZYb"
  """

  use Puid, charset: :alphanum
end
