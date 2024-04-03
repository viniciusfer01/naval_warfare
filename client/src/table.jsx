import { useState } from "react";

const TABLE_SIZE = 11;
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

function tableElementDecider(i, j, board, team) {
  if (i !== 0 && j === 0) {
    return rows[i - 1];
  } else if (i === 0 && j !== 0) {
    return j;
  } else if (i === 0 && j === 0) {
    return "/";
  } else {
    if (team === "yours") {
      if (board[i - 1][j - 1] === "x") {
        return "x";
      }
    }
    return ".";
  }
}

function buttonClickHandler(
  team,
  i,
  j,
  isYourTurn,
  setClickedCell,
  bombedCells,
  setBombedCells
) {
  if (i === 0 || j === 0) {
    return;
  } else if (team === "adversary" && isYourTurn) {
    console.log(`You clicked on the enemy's cell ${rows[i - 1]}${j}`);

    if (bombedCells.find((cell) => cell.i === i && cell.j === j)) {
      return;
    }
    setBombedCells([...bombedCells, { i, j }]);
    setClickedCell({ i, j });
  } else {
    return;
  }
}

function Table(props) {
  const [bombedCells, setBombedCells] = useState([]);

  return (
    <div className="table">
      {Array.from({ length: TABLE_SIZE }).map((_, i) => (
        <div key={i} className="row">
          {Array.from({ length: TABLE_SIZE }).map((_, j) => (
            <div key={j} className="cell">
              <button
                style={{
                  backgroundColor: bombedCells.find(
                    (cell) => cell.i === i && cell.j === j
                  )
                    ? "red"
                    : "#1a1a1a",
                }}
                className="cell-button"
                onClick={() => {
                  buttonClickHandler(
                    props.team,
                    i,
                    j,
                    props.isYourTurn,
                    props.setClickedCell,
                    bombedCells,
                    setBombedCells
                  );
                }}
              >
                {tableElementDecider(i, j, props.board, props.team)}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
