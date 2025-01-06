import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Grid, TurnsListItem, Tetromino, Turn, TurnsList } from "../../types";
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
  TETRONIMOS,
} from "../../constants";

interface TurnBuilderProps {
  setTurnsList: Dispatch<SetStateAction<TurnsList>>;
}

const INITIAL_GRID = gridBuilder(TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT);

function TurnBuilder({ setTurnsList }: TurnBuilderProps) {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  const [turnInput, setTurnInput] = useState<Turn[]>([]);
  const [freeTextInput, setFreeTextInput] = useState<string>("");
  const [selectedInputType, setSelectedInputType] = useState<
    "builder" | "text"
  >("text");

  function submitTurnAdditionForm(event: FormEvent) {
    event.preventDefault();
    if (turnInput) {
      const newTurn: TurnsListItem = { turns: turnInput };
      setTurnsList((prevTurns) => [...prevTurns, newTurn]);
      setTurnInput([]);
    }
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

  const processFreeTextInput = (e: FormEvent) => {
    e.preventDefault();
    const splitInput = freeTextInput.split(",");
    const addedTurn = splitInput.map((currentTurnDescription) => {
      const tetronimoName = currentTurnDescription.charAt(0);
      const colOffset = Number(currentTurnDescription.charAt(1));

      const selectedTetronimo = TETRONIMOS.filter(
        (curr) => curr.name === tetronimoName
      )[0];

      return { tetronimo: selectedTetronimo, colOffset };
    });

    const turnToAdd = { turns: addedTurn };

    setTurnsList((prevTurns) => [...prevTurns, turnToAdd]);
    setTurnInput([]);
  };

  const checkFreeTextValid = (text: string) => {
    const splitInput = text.split(",");
    const availableTetronimoNames = TETRONIMOS.map((curr) => curr.name);

    return !splitInput.some((currentTurnDescription) => {
      const tetronimoName = currentTurnDescription.charAt(0);
      return (
        currentTurnDescription.length !== 2 ||
        !availableTetronimoNames.includes(tetronimoName) ||
        !currentTurnDescription.charAt(1).match(/[0-9]/)
      );
    });
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
      {selectedInputType === "builder" && (
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
          style={{
            cursor: "pointer",
          }}
        />
      )}

      <form>
        <div>
          <label>
            <label>
              <input
                type="radio"
                value="builder"
                checked={selectedInputType === "builder"}
                onChange={() => {
                  setSelectedInputType("builder");
                  setTurnInput([]);
                  setFreeTextInput("");
                }}
              />
              Builder Input
            </label>
            <input
              type="radio"
              value="text"
              checked={selectedInputType === "text"}
              onChange={() => {
                setSelectedInputType("text");
                setTurnInput([]);
                setFreeTextInput("");
              }}
            />
            Text Input
          </label>
        </div>

        <div>
          {selectedInputType === "builder" && (
            <>
              <input
                type="text"
                disabled
                name="turnInput"
                placeholder={"e.g. T1,Z3,I4"}
                style={{ width: "100%", fontSize: 20 }}
                value={convertTurnToString(turnInput)}
              />
              <button
                onClick={submitTurnAdditionForm}
                disabled={!turnInput.length}
              >
                Add turn
              </button>
            </>
          )}

          {selectedInputType === "text" && (
            <>
              <input
                type="text"
                name="turnInput"
                placeholder={"e.g. T1,Z3,I4"}
                style={{ width: "100%", fontSize: 20 }}
                value={freeTextInput}
                onChange={(e) => setFreeTextInput(e?.target?.value)}
              />
              <button
                onClick={processFreeTextInput}
                disabled={!checkFreeTextValid(freeTextInput)}
              >
                Add turn
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
export default TurnBuilder;
