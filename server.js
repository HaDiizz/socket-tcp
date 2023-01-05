const net = require('net');
const HOST = '127.0.0.1';
const PORT = 6969;
const server = net.createServer(); // สร้าง server
const clients = []; // สร้างตัวแปรเพื่อเก็บ client ที่เข้ามาเชื่อมต่อกับ server
server.listen(PORT, HOST, () => { console.log(`Server is running on ${HOST}:${PORT}`); }); // ให้ server listen ที่ host 127.0.0.1, port 6969
server.on('connection', function (sock) { // เมื่อมีการเชื่อมต่อ (client เชื่อมต่อ)
  console.log(
    'CLIENT CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort
  ); // ให้แสดงข้อความ....
  clients.push(sock); // psuh cleint ที่เข้ามาเชื่อมต่อลงใน clients array
  sock.on('data', function (data) { // เมื่อมี event 'data'
    console.log(data + ' is connected : ' + sock.remoteAddress + sock.remotePort);  // ให้แสดงข้อความ...

    clients.forEach((client) => { // ลูป clients ทั้งหมดออกมา
      if (client !== sock) {  // จะส่งข้อความไปยังทุกๆ client ที่ไม่ใช่ current client
        return client.write(`from ${sock.remoteAddress}:${sock.remotePort} ${data} is connected`);
      }
    });
    sock.write(`Welcome, ${data}`); // ส่งข้อความนี้ให้ current client เท่านั้น
  });

  sock.on('close', function () {  // event close (เมื่อ client มีการ disconnect กับ server)
    const index = clients.indexOf(sock); // ให้ลบ client ที่ disconnect เอาออกจาก array
    if (index !== -1) {
      clients.splice(index, 1);
    }

    clients.forEach((client) => { // ส่งข้อความ disconnect ให้กับทุกๆ clients ที่ยังเชื่อมต่อกับ server
      if (client !== sock) {
        return client.write(`from ${sock.remoteAddress}:${sock.remotePort} is disconnected`);
      }
    })
    console.log(`Disconnected: ${sock.remoteAddress}:${sock.remotePort}`);
  });
});