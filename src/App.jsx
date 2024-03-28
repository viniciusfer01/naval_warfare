import "./App.css";
import Table from "./table";

function App() {
  return (
    <>
      <h1>Batalha Naval</h1>
      <div className="card">
        <Table team={"yours"} />
        <Table team={"adversary"} />
      </div>
      <p className="read-the-docs"></p>
    </>
  );
}

export default App;
