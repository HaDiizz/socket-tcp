const net = require('net');
const HOST = '127.0.0.1';
const PORT = 6969;
const CLIENT_NAME = 'CLIENT_2';
const client = new net.Socket();
client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);

  client.write(`${CLIENT_NAME}`);
});

client.on('data', function (data) {
  console.log('Message: ' + data);
});
client.on('close', function () {
  console.log('Connection closed');
});
