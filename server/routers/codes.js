const express = require('express');
const helpers = require('../database/helpers');

const codes = express.Router();

codes.post('/', (req, res) => {
  helpers.findJoinCode(req.body.joinCode)
    .then((found) => {
      if (found) {
        res.status(200).send({ gameFound: true });
      } else {
        res.status(404).send({ gameFound: false });
      }
    })
    .catch(err => res.end({ error: err, message: 'DATABASE ERROR' }));
});
module.exports = codes;
