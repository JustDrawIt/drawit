defmodule DrawIt.RandomWordsTest do
  use ExUnit.Case, async: true

  alias DrawIt.RandomWords

  describe "word/1" do
    setup do
      %{easy: easy, medium: medium, hard: hard, all: all} = RandomWords.all_words()
      %{easy: easy_es} = RandomWords.all_words(:es)

      %{easy: easy, medium: medium, hard: hard, all: all, easy_es: easy_es}
    end

    test "returns a random easy word when given :easy", %{easy: easy} do
      assert RandomWords.word(:easy) in easy
    end

    test "returns a random medium word when given :medium", %{medium: medium} do
      assert RandomWords.word(:medium) in medium
    end

    test "returns a random hard word when given :hard", %{hard: hard} do
      assert RandomWords.word(:hard) in hard
    end

    test "returns a random word when not given difficulty", %{all: all} do
      assert RandomWords.word() in all
    end

    test "returns a random word in specific language", %{easy_es: easy_es} do
      assert RandomWords.word(:easy, :es) in easy_es
    end
  end
end
