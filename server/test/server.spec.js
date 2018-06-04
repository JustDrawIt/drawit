const { expect } = require('chai');
const request = require('request');

describe('server', () => {
  it('should serve static files', (done) => {
    request('http://localhost:8080', (error, response, body) => {
      expect(body).to.include('</html>');
      done();
    });
  });
});
