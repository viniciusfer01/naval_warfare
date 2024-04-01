import { useState } from "react";

const TABLE_SIZE = 11;
const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

function tableElementDecider(i, j) {
  if (i !== 0 && j === 0) {
    return rows[i - 1];
  } else if (i === 0 && j !== 0) {
    return j;
  } else if (i === 0 && j === 0) {
    return "/";
  } else {
    return ".";
  }
}

function buttonClickHandler(
  team,
  i,
  j,
  isYourTurn,
  setClickedCells,
  clickedButtons
) {
  if (i === 0 || j === 0) {
    return;
  } else if (isYourTurn) {
    if (team === "yours") {
      console.log(`You clicked on your cell ${rows[i - 1]}${j}`);
      // check if the cell was already clicked
      if (clickedButtons.some((button) => button.i === i && button.j === j)) {
        // delete the cell from the clickedCells array
        setClickedCells((prevButtons) =>
          prevButtons.filter((button) => button.i !== i || button.j !== j)
        );
      } else {
        setClickedCells((prevButtons) => [...prevButtons, { i, j }]);
      }
    } else {
      console.log(`You clicked on the enemy's cell ${rows[i - 1]}${j}`);
    }
  } else {
    return;
  }
}

function Table(props) {
  const [clickedButtons, setClickedCells] = useState([]);

  return (
    <div className="table">
      {Array.from({ length: TABLE_SIZE }).map((_, i) => (
        <div key={i} className="row">
          {Array.from({ length: TABLE_SIZE }).map((_, j) => (
            <div key={j} className="cell">
              <button
                className="cell-button"
                style={{
                  backgroundColor: clickedButtons.some(
                    (button) => button.i === i && button.j === j
                  )
                    ? "red"
                    : "#1a1a1a",
                }}
                onClick={() => {
                  buttonClickHandler(
                    props.team,
                    i,
                    j,
                    props.isYourTurn,
                    setClickedCells,
                    clickedButtons
                  );
                }}
              >
                {tableElementDecider(i, j)}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
