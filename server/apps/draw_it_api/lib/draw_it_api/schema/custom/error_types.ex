defmodule DrawItApi.Schema.Custom.Types do
  @moduledoc """
  Error types for DrawIt's GraphQL API.
  """

  use Absinthe.Schema.Notation

  @desc "An error for a particular input field"
  object :field_error do
    field :type, non_null(:string)
    field :message, non_null(:string)
  end

  @desc "An error encountered while trying to persist input"
  object :input_error do
    field :field, non_null(:string)
    field :errors, list_of(:field_error)
  end
end
