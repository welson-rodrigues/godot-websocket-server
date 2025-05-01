// server.js
const net = require('net');
const PORT = process.env.PORT || 1027;

const server = net.createServer(socket => {
  console.log('Cliente conectado:', socket.remoteAddress + ':' + socket.remotePort);
  
  socket.on('data', data => {
    console.log('Recebido do cliente:', data.toString());
    // Aqui você pode repassar dados a outros clientes, etc.
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  socket.on('error', err => {
    console.error('Erro no socket:', err);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor TCP ouvindo na porta ${PORT}`);
});
