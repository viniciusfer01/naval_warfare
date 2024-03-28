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

function buttonClickHandler(team, i, j) {
  console.log(team, i, j);
}

function Table(props) {
  return (
    <div className="table">
      {Array.from({ length: TABLE_SIZE }).map((_, i) => (
        <div key={i} className="row">
          {Array.from({ length: TABLE_SIZE }).map((_, j) => (
            <div key={j} className="cell">
              <button
                className="cell-button"
                onClick={() => {
                  buttonClickHandler(props.team, i, j);
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
