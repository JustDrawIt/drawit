const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const wordsFile = path.resolve(__dirname, 'words.json');

module.exports = () => readFile(wordsFile, 'utf8').then((wordsPlainText) => {
  const { easy } = JSON.parse(wordsPlainText);
  const randomIndex = Math.floor(Math.random() * easy.length);
  const randomWord = easy[randomIndex];

  return randomWord;
});
