defmodule DrawIt.Repo do
  use Ecto.Repo,
    otp_app: :draw_it,
    adapter: Ecto.Adapters.Postgres
end
