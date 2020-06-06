const { server } = require('./server');
const { PORT, HOSTNAME } = require('./config');

server.listen(PORT, HOSTNAME, () => console.log('Server listening on %s', PORT));
