const net = require('net');
const HOST = '127.0.0.1';
const PORT = 6969;
const server = net.createServer();
const clients = [];
server.listen(PORT, HOST, () => { console.log(`Server is running on ${HOST}:${PORT}`); });
server.on('connection', function (sock) {
  console.log(
    'CLIENT CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort
  );
  clients.push(sock);
  sock.on('data', function (data) {
    console.log(data + ' is connected : ' + sock.remoteAddress);

    clients.forEach((client) => {
      if (client !== sock) {
        return client.write(`from ${sock.remoteAddress}: ${data} is connected`);
      }
    });
    sock.write(`Welcome, ${data}`);
  });

  sock.on('close', function (data) {
    console.log(`disconnected: ${sock.remoteAddress}:${sock.remotePort}`);

    const index = clients.indexOf(sock);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});