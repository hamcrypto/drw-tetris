import { Dispatch, SetStateAction, useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Grid, Tetromino, Turn } from "../../types";
import GridDisplay from "../GridDisplay/GridDisplay";
import { convertTurnToString, createGrid } from "../../utils";
import { TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT } from "../../constants";
import { positionTetronimoOnGrid } from "./utils";

const INITIAL_GRID = createGrid(TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT);
function VisualTurnBuilder({
  setTurnInput,
  turnInput,
}: {
  setTurnInput: Dispatch<SetStateAction<Turn[]>>;
  turnInput: Turn[];
}) {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  const [selectedOffset, setSelectedOffset] = useState<number | null>(null);
  const [turnSelectorGridPreview, setTurnSelectorGridPreview] =
    useState<Grid>(INITIAL_GRID);

  return (
    <>
      <TetronimoSelector
        activeTetronimo={activeTetronimo}
        setActiveTetronimo={setActiveTetronimo}
      />
      <GridDisplay
        gridState={turnSelectorGridPreview}
        gridOptions={{
          blockOptions: {
            onMouseOver: (_event, block) => {
              if (activeTetronimo)
                positionTetronimoOnGrid(
                  activeTetronimo,
                  block.xCord,
                  setTurnSelectorGridPreview,
                  setSelectedOffset
                );
            },
            onClick: () => {
              if (activeTetronimo && selectedOffset) {
                setTurnInput((prevInput) => [
                  ...prevInput,
                  {
                    tetronimo: activeTetronimo,
                    colOffset: selectedOffset,
                  },
                ]);
                setActiveTetronimo(null);
                setTurnSelectorGridPreview(INITIAL_GRID);
              }
            },
          },
        }}
        style={{
          cursor: "pointer",
        }}
      />
      <input
        type="text"
        disabled
        placeholder={"Select a Tetromino then place it in the grid above"}
        style={{ width: "100%", fontSize: 15 }}
        value={convertTurnToString(turnInput)}
      />
    </>
  );
}

export default VisualTurnBuilder;
