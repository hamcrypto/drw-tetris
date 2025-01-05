import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Grid, Tetromino, Turn, TurnsList } from "../../types";
import GridDisplay from "../GridDisplay/GridDisplay";
import {
  convertTurnToString,
  gridBuilder,
  mergeBlockArrays,
} from "../../utils";
import {
  TETRIS_COL_COUNT,
  TETRONIMO_COL_COUNT,
  TETRONIMO_ROW_COUNT,
} from "../../constants";

interface TurnBuilderProps {
  turnsList: TurnsList;
  setTurnsList: Dispatch<SetStateAction<TurnsList>>;
}

const INITIAL_GRID = gridBuilder(TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT);

function TurnBuilder({ turnsList, setTurnsList }: TurnBuilderProps) {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  const [turnInput, setTurnInput] = useState<Turn[]>([]);
  function submitTurnAdditionForm(event: FormEvent) {
    event.preventDefault();
    if (turnInput) {
      setTurnsList((prevTurns) => [...prevTurns, turnInput]);
      setTurnInput([]);
    }
  }

  function resetTurnsList() {
    setTurnsList([]);
  }

  const [turnSelectorGridPreview, setTurnSelectorGridPreview] =
    useState<Grid>(INITIAL_GRID);

  const positionNewTetronimo = (tetronimo: Tetromino, xCord: number) => {
    const tetronimoConvertedToGrid = gridBuilder(
      TETRONIMO_ROW_COUNT,
      TETRONIMO_COL_COUNT,
      tetronimo
    );

    const updatedGrid = mergeBlockArrays(
      INITIAL_GRID,
      tetronimoConvertedToGrid,
      { colOffset: xCord, rowOffset: 0 }
    );

    if (updatedGrid !== false) {
      setTurnSelectorGridPreview(updatedGrid);
    }
    return updatedGrid;
  };

  return (
    <div>
      <h3>Turn builder</h3>
      <div style={{ display: "flex" }}>
        <TetronimoSelector
          activeTetronimo={activeTetronimo}
          setActiveTetronimo={setActiveTetronimo}
        />
      </div>
      <GridDisplay
        gridState={turnSelectorGridPreview}
        gridOptions={{
          blockOptions: {
            onMouseOver: (_event, block) => {
              if (activeTetronimo)
                positionNewTetronimo(activeTetronimo, block.xCord);
            },
            onClick: (_event, block) => {
              if (activeTetronimo)
                setTurnInput((prevInput) => [
                  ...prevInput,
                  { tetronimo: activeTetronimo, colOffset: block.xCord },
                ]);
              setActiveTetronimo(null);
              setTurnSelectorGridPreview(INITIAL_GRID);
            },
          },
        }}
        style={{ cursor: "pointer" }}
      />

      <form>
        <input
          type="text"
          disabled
          name="turnInput"
          placeholder={"e.g. T1,Z3,I4"}
          style={{ width: "100%", fontSize: 20 }}
          value={convertTurnToString(turnInput)}
        />
        <button onClick={submitTurnAdditionForm} disabled={!turnInput.length}>
          Add turn
        </button>
        <button onClick={resetTurnsList} disabled={!turnsList.length}>
          Reset turns list
        </button>
      </form>
    </div>
  );
}
export default TurnBuilder;
