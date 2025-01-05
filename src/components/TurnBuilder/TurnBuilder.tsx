import { FormEvent, useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Tetromino } from "../../types";

interface TurnsListTableProps {
  turnsList: string[];
}

function TurnsListTable({ turnsList }: TurnsListTableProps) {
  return (
    <table
      style={{ width: "100%", textAlign: "left", border: "1px solid black" }}
    >
      <thead>
        <tr>
          <th>Count</th>
          <th>Turn Play</th>
        </tr>
      </thead>
      <tbody>
        {turnsList.map((currentTurn, count) => (
          <tr>
            <td>{count}</td>
            <td>{currentTurn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TurnBuilder() {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  const [turnsList, setTurnsList] = useState<string[]>([]);
  const [turnInput, setTurnInput] = useState<string>("");
  function submitTurnAdditionForm(event: FormEvent) {
    event.preventDefault();
    if (turnInput) {
      setTurnsList((prevTurns) => [...prevTurns, turnInput]);
      setTurnInput("");
    }
  }
  return (
    <div>
      <h3>Turn builder</h3>
      <div style={{ display: "flex" }}>
        <TetronimoSelector
          activeTetronimo={activeTetronimo}
          setActiveTetronimo={setActiveTetronimo}
        />
      </div>
      <form>
        <input
          type="text"
          name="turnInput"
          placeholder={"e.g. T1,Z3,I4"}
          style={{ width: "100%" }}
          value={turnInput}
          onChange={(event) => setTurnInput(event.target.value)}
        />
        <button onClick={submitTurnAdditionForm} disabled={!turnInput.length}>
          Add turn
        </button>
      </form>

      <TurnsListTable turnsList={turnsList} />
    </div>
  );
}
export default TurnBuilder;
