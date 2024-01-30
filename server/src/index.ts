import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  console.log("WebSocket client connected");

  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);

    // Broadcast message to all clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.use(express.static("public"));

// const PORT = process.env.PORT || 3000;
server.listen(3000, "192.168.1.12", () => {
  console.log(`Server running on port ${3000}`);
});
