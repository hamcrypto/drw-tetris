import { Dispatch, SetStateAction } from "react";
import { Grid, TurnsList } from "../../types";
import { convertTurnToString } from "../../utils";

interface TurnsListTableProps {
  turnsList: TurnsList;
  setPreviewGrid: Dispatch<SetStateAction<Grid>>;
  setShowPreviewGrid: Dispatch<SetStateAction<boolean>>;
}

function TurnsListTable({
  turnsList,
  setPreviewGrid,
  setShowPreviewGrid,
}: TurnsListTableProps) {
  const setPreviewGridToResult = (turnCount: number) => {
    if (turnsList[turnCount].result)
      setPreviewGrid(turnsList[turnCount].result?.outputGrid);
    setShowPreviewGrid(true);
  };

  return (
    <div>
      <table
        style={{ width: "100%", textAlign: "left", border: "1px solid black" }}
      >
        <thead>
          <tr>
            <th>Number</th>
            <th>Turn Play</th>
            <th>Resulting Block Height</th>
            <th>Preview Result</th>
          </tr>
        </thead>
        <tbody>
          {!turnsList.length && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No turns have been added
              </td>
            </tr>
          )}
          {turnsList.map((currentTurn, count) => (
            <tr key={count}>
              <td>{count}</td>
              <td>{convertTurnToString(currentTurn.turns)}</td>
              {currentTurn?.result ? (
                <>
                  <td>{currentTurn.result.blockHeight} </td>
                  <td>
                    <button onClick={() => setPreviewGridToResult(count)}>
                      Visualize
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>Pending</td>
                  <td>Pending</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TurnsListTable;
