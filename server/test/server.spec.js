const axios = require('axios');
const { expect } = require('chai');

describe('server', () => {
  it('should serve static files', (done) => {
    axios('http://localhost:8080').then((response) => {
      expect(response.data).to.include('</html>');
      done();
    });
  });
});
