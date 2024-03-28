const TABLE_SIZE = 10;

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
                  console.log(props.team, i, j);
                }}
              >
                {i},{j}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
