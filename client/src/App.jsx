import "./App.css";
import Table from "./table";
import { useState, useEffect } from "react";

const id = Math.random();

// hardcoded board
const BOARD = [
  ["x", "x", "x", "x", "x", " ", " ", " ", " ", " "],
  ["x", "x", "x", "x", " ", " ", "x", "x", "x", "x"],
  [" ", "x", " ", " ", "x", " ", " ", "x", " ", " "],
  ["x", " ", "x", "x", " ", "x", "x", " ", "x", " "],
  ["x", "x", " ", "x", "x", " ", "x", "x", " ", " "],
  ["x", " ", "x", " ", "x", " ", "x", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

function App() {
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.addEventListener("open", (event) => {
      socket.send(JSON.stringify({ type: "connect", id }));

      if (clickedCell) {
        console.log("Sending move: ", clickedCell);

        socket.send(
          JSON.stringify({ type: "move", move: clickedCell, id: id })
        );
        setIsYourTurn(false);
      }
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server: ", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "start") {
        setIsWaiting(false);
      } else if (data.type === "your-turn") {
        setIsYourTurn(true);
      } else if (data.type === "match-ended") {
        setIsWaiting(true);
      } else if (data.type === "move") {
        console.log("Received move: ", data.move);
        const { i, j } = data.move;

        // check if the move is a hit
        if (BOARD[i - 1][j - 1] === "x") {
          console.log("Hit!");
          socket.send(JSON.stringify({ type: "hit", move: data.move, id }));
        } else {
          console.log("Miss!");
          socket.send(JSON.stringify({ type: "miss", move: data.move, id }));
        }
      } else if (data.type === "score") {
        console.log("Received score: ", data.move, data.score);
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Connection closed!");
      setIsWaiting(true);
    });
  }, [clickedCell]);

  return (
    <>
      <h1>Batalha Naval</h1>
      {isWaiting ? (
        <p>Waiting for other players...</p>
      ) : (
        <>
          <div className="card">
            <Table team={"yours"} isYourTurn={isYourTurn} board={BOARD} />
            <Table
              team={"adversary"}
              isYourTurn={isYourTurn}
              setClickedCell={setClickedCell}
            />
          </div>
          <div className="ship-selection">
            <p>1 Porta-aviões</p>
            <p>2 Encouraçados</p>
            <p>3 Hidroaviões</p>
            <p>4 Submarinos</p>
            <p>3 Cruzadores</p>
          </div>
        </>
      )}
    </>
  );
}

export default App;
