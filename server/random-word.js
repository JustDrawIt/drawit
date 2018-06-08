const axios = require('axios');
const { WORDNIK } = require('./config');

const { ENDPOINT, QUERY, API_KEY } = WORDNIK;
const api = `${ENDPOINT}
  ?hasDictionaryDef=${QUERY.hasDictionaryDef}
  &includePartOfSpeech=${QUERY.includePartOfSpeech.join(',')}
  &excludePartOfSpeech=${QUERY.excludePartOfSpeech.join(',')}
  &minCorpusCount=${QUERY.minCorpusCount}
  &maxCorpusCount=${QUERY.maxCorpusCount}
  &minDictionaryCount=${QUERY.minDictionaryCount}
  &maxDictionaryCount=${QUERY.maxDictionaryCount}
  &minLength=${QUERY.minLength}
  &maxLength=${QUERY.maxLength}
  &api_key=${API_KEY}
`.replace(/\s/g, '');

module.exports = () => axios(api).then(response => response.data.word);
