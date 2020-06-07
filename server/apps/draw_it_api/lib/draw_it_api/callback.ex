defmodule DrawItApi.Callback do
  @moduledoc """
  `DrawIt.Callback` subscriber module for `DrawItApi`.
  Broadcasts Absinthe subscription events when appropriate events occur in the business logic.
  """

  alias Absinthe.Subscription, warn: false

  # Implement callback behaviours
  # @behaviour DrawIt.DomainName.Callback

  # Broadcast Absinthe subscription events using `Absinthe.Subscription.publish/3`
  #
  # def event_occurred(args) do
  #   Subscription.publish(pubsub(), args, subscription_field_name: "topic")
  # end

  @doc false
  def pubsub do
    Application.get_env(:DrawIt_api, :pubsub)
  end
end
