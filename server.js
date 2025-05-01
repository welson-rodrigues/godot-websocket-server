const WebSocket = require("ws");
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function connection(ws) {
  console.log("Cliente conectado");

  ws.on("message", function incoming(message) {
    console.log("Recebido:", message);
    // Opcional: enviar para todos os clientes
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

console.log("Servidor WebSocket rodando na porta", PORT);
