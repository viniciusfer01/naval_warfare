import "./App.css";
import Table from "./table";
import { useState, useEffect, useMemo } from "react";

function App() {
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);
  const socket = useMemo(() => new WebSocket("ws://localhost:8080"), []);

  useEffect(() => {
    socket.addEventListener("open", (event) => {
      socket.send("Connection established!");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server: ", event.data);
    });

    socket.addEventListener("close", (event) => {
      console.log("Connection closed!");
      setIsWaiting(true);
    });
  }, [socket]);

  return (
    <>
      <h1>Batalha Naval</h1>
      {isWaiting ? (
        <p>Waiting for other players...</p>
      ) : (
        <>
          <div className="card">
            <Table team={"yours"} isYourTurn={isYourTurn} />
            <Table team={"adversary"} isYourTurn={isYourTurn} />
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
