const net = require('net');
const HOST = '127.0.0.1';
const PORT = 6969;
const CLIENT_NAME = 'CLIENT_1';
const client = new net.Socket();  // เชื่อมต่อกับ server, address: 127.0.0.1:6969
client.connect(PORT, HOST, function () {
  console.log('CONNECTED TO: ' + HOST + ':' + PORT);

  client.write(`${CLIENT_NAME}`); // ส่งชื่อ client ไปยัง server
});

client.on('data', function (data) { // data คือข้อมูลที่ถูกส่งมาจาก server
  console.log('Message: ' + data);
  // client.destroy();
});
client.on('close', function () {
  console.log('Connection closed');
});