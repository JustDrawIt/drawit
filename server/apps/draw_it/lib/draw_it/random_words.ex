defmodule DrawIt.RandomWords do
  @doc """
  Returns a random word based on difficulty (`:easy`, `:medium`, or `:hard`).
  If not provided a random difficulty will be given.
  """
  def word() do
    Enum.random([:easy, :medium, :hard])
    |> word()
  end

  def word(difficulty) do
    difficulty
    |> load_words()
    |> Enum.random()
  end

  def load_words(difficulty) do
    directory = Path.dirname(__ENV__.file)
    path = "#{directory}/random_words/#{difficulty}.json"

    path
    |> File.read!()
    |> Jason.decode!()
  end

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
