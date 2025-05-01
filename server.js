const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function connection(ws) {
  console.log("Cliente conectado");

  ws.on("message", function incoming(message) {
    // Aqui você pode logar ou repassar mensagens
    console.log("Recebido:", message.toString());

    // Ecoar para todos (broadcast)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

console.log(`Servidor WebSocket escutando na porta ${PORT}`);
