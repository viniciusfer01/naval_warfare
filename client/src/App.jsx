import "./App.css";
import Table from "./table";
import { useState } from "react";

function App() {
  const [isYourTurn, setIsYourTurn] = useState(true);

  return (
    <>
      <h1>Batalha Naval</h1>
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
  );
}

export default App;
