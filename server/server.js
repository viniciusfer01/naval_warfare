const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let players = [];
isMatchStarted = false;
let currentPlayer = null;

wss.on("connection", function connection(ws) {
  console.log("A new client connected!");

  if (!isMatchStarted && players.length >= 2) {
    isMatchStarted = true;
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "start" }));

        // Switch to the other player
        currentPlayer = players.find((player) => player.ws !== ws);
        currentPlayer.ws.send(JSON.stringify({ type: "your-turn" }));
      }
    });
  }

  ws.on("message", function incoming(message) {
    ({ type, move, id } = JSON.parse(message));
    console.log("Received: ", JSON.parse(message));

    // if the player id isn't already in the list, add it
    if (!players.find((player) => player.id === id)) {
      players.push({ ws, id, score: 0 });
    }

    if (isMatchStarted && currentPlayer && id === currentPlayer.id) {
      if (type === "move") {
        console.log("Received move: ", move);

        // Send the move to the other player
        players
          .find((player) => player.id !== currentPlayer.id)
          .ws.send(JSON.stringify({ type: "move", move: move }));
      }

      if (type === "hit") {
      } else if (type === "miss") {
        currentPlayer.ws.send(JSON.stringify({ type: "miss", move: move }));

        // Switch to the other player
        currentPlayer = players.find((player) => player.id !== id);
        currentPlayer.ws.send(JSON.stringify({ type: "your-turn" }));
      }
    } else if (type === "hit") {
      // Send the hit to the other player
      currentPlayer.score += 1;
      currentPlayer.ws.send(
        JSON.stringify({
          type: "score",
          move: move,
          score: currentPlayer.score,
        })
      );

      players = [
        ...players.filter((player) => player.id !== currentPlayer.id),
        currentPlayer,
      ];

      if (currentPlayer.score > 31) {
        currentPlayer.ws.send(JSON.stringify({ type: "winner" }));

        players
          .find((player) => player.id !== currentPlayer.id)
          .ws.send(JSON.stringify({ type: "loser" }));

        setTimeout(() => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: "match-ended" }));
            }
          });

          isMatchStarted = false;
        }, 5000);
      }

      // Switch to the other player
      currentPlayer = players.find((player) => player.id !== currentPlayer.id);
      currentPlayer.ws.send(JSON.stringify({ type: "your-turn" }));
    } else if (type === "miss") {
      currentPlayer.ws.send(JSON.stringify({ type: "miss", move: move }));

      // Switch to the other player
      currentPlayer = players.find((player) => player.id !== currentPlayer.id);
      currentPlayer.ws.send(JSON.stringify({ type: "your-turn" }));
    }
  });

  ws.on("close", function close() {
    console.log("A client disconnected!");
    players = players.filter((player) => player.id !== id);

    if (players.length < 2) {
      isMatchStarted = false;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "match-ended" }));
        }
      });
    }
  });
});

console.log("Server started on port 8080");
