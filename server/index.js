const { server } = require('./server');
const { PORT } = require('./config');

server.listen(PORT, () => console.log('Server listening on %s', PORT));
