defmodule DrawIt.RandomWords do
  @moduledoc """
  A module used for generating random drawable words based on difficulty.
  See `word/0` and `word/1` for more.
  """

  @type difficulty :: :easy | :medium | :hard

  @doc """
  Returns a random word of any difficulty.
  """
  def word() do
    Enum.random([:easy, :medium, :hard])
    |> word()
  end

  @doc """
  Returns a random word based on `difficulty`.
  """
  @spec word(difficulty()) :: String.t()
  def word(difficulty) do
    difficulty
    |> load_words()
    |> Enum.random()
  end

  @spec load_words(difficulty()) :: [String.t()]
  def load_words(difficulty) do
    directory = Path.dirname(__ENV__.file)
    path = "#{directory}/random_words/#{difficulty}.json"

    path
    |> File.read!()
    |> Jason.decode!()
  end

  @spec all_words() :: %{
          easy: [String.t()],
          medium: [String.t()],
          hard: [String.t()],
          all: [String.t()]
        }
  def all_words() do
    easy = load_words(:easy)
    medium = load_words(:medium)
    hard = load_words(:hard)
    all = easy ++ medium ++ hard

    %{
      easy: easy,
      medium: medium,
      hard: hard,
      all: all
    }
  end
end
