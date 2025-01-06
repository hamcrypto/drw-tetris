import { Dispatch, SetStateAction, useState } from "react";
import TetronimoSelector from "../TetronimoSelector/TetronimoSelector";
import { Grid, Tetromino, Turn, TurnsList } from "../../types";
import GridDisplay from "../GridDisplay/GridDisplay";
import { convertTurnToString, createGrid } from "../../utils";
import { TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT } from "../../constants";
import {
  handleSubmitTurn,
  isFreeTextValid,
  positionTetronimoOnGrid,
  processFreeText,
} from "./utils";

interface TurnBuilderProps {
  setTurnsList: Dispatch<SetStateAction<TurnsList>>;
}

const INITIAL_GRID = createGrid(TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT);

function TurnBuilder({ setTurnsList }: TurnBuilderProps) {
  const [activeTetronimo, setActiveTetronimo] = useState<Tetromino | null>(
    null
  );
  const [turnInput, setTurnInput] = useState<Turn[]>([]);
  const [freeTextInput, setFreeTextInput] = useState<string>("");
  const [selectedInputType, setSelectedInputType] = useState<
    "builder" | "text"
  >("text");
  const [turnSelectorGridPreview, setTurnSelectorGridPreview] =
    useState<Grid>(INITIAL_GRID);

  return (
    <div>
      <h3>Turn builder</h3>
      <TetronimoSelector
        activeTetronimo={activeTetronimo}
        setActiveTetronimo={setActiveTetronimo}
      />
      <div>
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
        <label>
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

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedInputType === "builder") {
            handleSubmitTurn(turnInput, setTurnsList, setTurnInput);
          } else {
            processFreeText(freeTextInput, setTurnsList);
          }
        }}
      >
        {/* Builder Input */}
        {selectedInputType === "builder" && (
          <>
            <GridDisplay
              gridState={turnSelectorGridPreview}
              gridOptions={{
                blockOptions: {
                  onMouseOver: (_event, block) => {
                    if (activeTetronimo)
                      positionTetronimoOnGrid(
                        activeTetronimo,
                        block.xCord,
                        setTurnSelectorGridPreview
                      );
                  },
                  onClick: (_event, block) => {
                    if (activeTetronimo) {
                      setTurnInput((prevInput) => [
                        ...prevInput,
                        {
                          tetronimo: activeTetronimo,
                          colOffset: block.xCord,
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
        )}

        {selectedInputType === "text" && (
          <input
            type="text"
            placeholder={"e.g. T1,Z3,I4"}
            style={{ width: "100%", fontSize: 15 }}
            value={freeTextInput}
            onChange={(e) => setFreeTextInput(e.target.value)}
          />
        )}

        <button
          type="submit"
          disabled={
            selectedInputType === "builder"
              ? !turnInput.length
              : !isFreeTextValid(freeTextInput)
          }
        >
          Add turn
        </button>
      </form>
    </div>
  );
}

export default TurnBuilder;
