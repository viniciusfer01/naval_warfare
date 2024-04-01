const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("Hello! Message From Server!!");

  ws.on("close", function close() {
    console.log("A client disconnected!");
  });
});
