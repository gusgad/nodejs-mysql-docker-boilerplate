const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);

console.log('[app] Listening on port:', port);
server.listen(port);
