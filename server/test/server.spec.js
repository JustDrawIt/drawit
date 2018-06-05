const request = require('request');
const { expect } = require('chai');

describe('server', () => {
  it('should serve static files', (done) => {
    request('http://localhost:8080', (error, response, body) => {
      expect(body).to.include('</html>');
      done();
    });
  });
});
