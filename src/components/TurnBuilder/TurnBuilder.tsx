import { useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Tetromino } from "../../types";

function TurnBuilder() {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );

  return (
    <div>
      <h3>Turn builder</h3>
      <div style={{ display: "flex" }}>
        <TetronimoSelector
          activeTetronimo={activeTetronimo}
          setActiveTetronimo={setActiveTetronimo}
        />
      </div>
    </div>
  );
}
export default TurnBuilder;
