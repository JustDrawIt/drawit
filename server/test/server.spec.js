const axios = require('axios');
const { expect } = require('chai');
const mongoose = require("mongoose");

after(async () => {
  await mongoose.disconnect();
});

describe('server', () => {
  it('should serve static files', (done) => {
    axios('http://localhost:8080').then((response) => {
      expect(response.data).to.include('</html>');
      done();
    });
  });
});
