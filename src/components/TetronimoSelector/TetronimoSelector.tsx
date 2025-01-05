import { TETRONIMOS } from "../../constants";
import { Tetromino } from "../../types";
import { gridBuilder } from "../../utils";
import GridDisplay from "../GridDisplay/GridDisplay";

interface TetronimoPieceHolderProps {
  tetronimo: Tetromino;
}

function TetronimoPieceHolder({ tetronimo }: TetronimoPieceHolderProps) {
  const gridState = gridBuilder(4, 4, tetronimo);
  return (
    <div
      style={{
        margin: "2px",
      }}
    >
      <GridDisplay gridState={gridState} />
    </div>
  );
}

function TetronimoSelector() {
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
        <TetronimoPieceHolder tetronimo={currentTetronimo} />
      ))}
    </div>
  );
}

export default TetronimoSelector;
