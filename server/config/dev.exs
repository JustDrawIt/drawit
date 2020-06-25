use Mix.Config

# Do not include timestamps in development logs
config :logger, :console,
  format: "$metadata[$level] $message\n",
  metadata: [:join_code, :player, :guess, :correct_word, :round_id]
