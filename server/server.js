const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let players = [];

isMatchStarted = false;

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");

  let id = null;
  let type = null;

  ws.on("message", function incoming(message) {
    ({ id, type } = JSON.parse(message));
    console.log("Received: ", id);

    // if the player id isn't already in the list, add it
    if (!players.find((player) => player.id === id)) {
      players.push({ id });
    }

    ws.send(JSON.stringify(players));
  });

  ws.on("close", function close() {
    console.log("A client disconnected!");
    players = players.filter((player) => player.id !== id);
  });

  setInterval(() => {
    if (!isMatchStarted) {
      if (players.length >= 2) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            isMatchStarted = true;
            client.send(JSON.stringify({ type: "start" }));
          }
        });
      }
    } else {
      if (players.length < 2) {
        isMatchStarted = false;
      }

      if (id === players[0].id) {
        ws.send(JSON.stringify({ type: "your-turn" }));
      }
    }
  }, 5000);
});
