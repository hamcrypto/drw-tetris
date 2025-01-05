import { Dispatch, SetStateAction, useState } from "react";
import { TETRONIMOS } from "../../constants";
import { Tetromino } from "../../types";
import { gridBuilder } from "../../utils";
import GridDisplay from "../GridDisplay/GridDisplay";

interface TetronimoPieceHolderProps {
  tetronimo: Tetromino;
  setActiveTetronimo: Dispatch<SetStateAction<Tetromino | null>>;
  isSelected: boolean;
}

function TetronimoPieceHolder({
  tetronimo,
  setActiveTetronimo,
  isSelected,
}: TetronimoPieceHolderProps) {
  const gridState = gridBuilder(4, 4, tetronimo);

  return (
    <div
      style={{
        margin: "2px",
        cursor: "pointer",
        backgroundColor: isSelected ? "yellow" : undefined,
      }}
      onClick={() => setActiveTetronimo(isSelected ? null : tetronimo)}
    >
      <GridDisplay gridState={gridState} />
    </div>
  );
}

function TetronimoSelector() {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  return (
    <div
      style={{
        height: "600px",
        width: "358px",
        overflowY: "scroll",
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      {TETRONIMOS.map((currentTetronimo) => (
        <TetronimoPieceHolder
          tetronimo={currentTetronimo}
          key={currentTetronimo.name}
          isSelected={activeTetronimo?.name === currentTetronimo?.name}
          setActiveTetronimo={setActiveTetronimo}
        />
      ))}
    </div>
  );
}

export default TetronimoSelector;
