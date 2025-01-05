import { TurnsList } from "../../types";
import { convertTurnToString } from "../../utils";

interface TurnsListTableProps {
  turnsList: TurnsList;
}

function TurnsListTable({ turnsList }: TurnsListTableProps) {
  return (
    <table
      style={{ width: "100%", textAlign: "left", border: "1px solid black" }}
    >
      <thead>
        <tr>
          <th>Number</th>
          <th>Turn Play</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {!turnsList.length && (
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              No turns have been added
            </td>
          </tr>
        )}
        {turnsList.map((currentTurn, count) => (
          <tr>
            <td>{count}</td>
            <td>{convertTurnToString(currentTurn)}</td>
            <td>Pending</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TurnsListTable;
