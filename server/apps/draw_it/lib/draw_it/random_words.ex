defmodule DrawIt.RandomWords do
  @moduledoc """
  A module used for generating random drawable words based on difficulty.
  See `word/0` and `word/1` for more.
  """

  @type difficulty :: :easy | :medium | :hard
  @type language :: :en | :es

  @doc """
  Returns a random english word of any difficulty.
  """
  def word do
    Enum.random([:easy, :medium, :hard])
    |> word()
  end

  @doc """
  Returns a random word based on `difficulty` and `language`.
  Language defaults to `:en`.
  If no word can be found, `nil` is returned.
  """
  @spec word(difficulty(), language()) :: String.t()
  def word(difficulty, language \\ :en) do
    words = load_words(difficulty, language)

    if Enum.empty?(words) do
      nil
    else
      Enum.random(words)
    end
  end

  @spec load_words(difficulty(), language()) :: [String.t()]
  def load_words(difficulty, language \\ :en) do
    directory = Path.dirname(__ENV__.file)
    path = "#{directory}/random_words/#{language}/#{difficulty}.json"

    path
    |> File.read!()
    |> Jason.decode!()
  end

  @spec all_words(language()) :: %{
          easy: [String.t()],
          medium: [String.t()],
          hard: [String.t()],
          all: [String.t()]
        }
  def all_words(language \\ :en) do
    easy = load_words(:easy, language)
    medium = load_words(:medium, language)
    hard = load_words(:hard, language)
    all = easy ++ medium ++ hard

    %{
      easy: easy,
      medium: medium,
      hard: hard,
      all: all
    }
  end
end
