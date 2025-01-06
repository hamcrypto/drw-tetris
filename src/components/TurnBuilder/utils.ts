import { Dispatch, SetStateAction } from "react";
import { Grid, TurnsListItem, Tetromino, Turn, TurnsList } from "../../types";
import { createGrid, mergeGrids } from "../../utils";
import {
  TETRIS_COL_COUNT,
  TETRONIMO_COL_COUNT,
  TETRONIMO_ROW_COUNT,
  TETRONIMOS,
} from "../../constants";

// Helper function to handle turn submission
export const handleSubmitTurn = (
  turnInput: Turn[],
  setTurnsList: Dispatch<SetStateAction<TurnsList>>,
  setTurnInput: Dispatch<SetStateAction<Turn[]>>
) => {
  if (turnInput.length > 0) {
    const newTurn: TurnsListItem = { turns: turnInput };
    setTurnsList((prevTurns) => [...prevTurns, newTurn]);
    setTurnInput([]);
  }
};

// Helper function to validate free text input
export const isFreeTextValid = (text: string) => {
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

// Helper function to process free text input and add turn
export const processFreeText = (
  freeTextInput: string,
  setTurnsList: Dispatch<SetStateAction<TurnsList>>
) => {
  const splitInput = freeTextInput.split(",");
  const addedTurn = splitInput.map((currentTurnDescription) => {
    const tetronimoName = currentTurnDescription.charAt(0);
    const colOffset = Number(currentTurnDescription.charAt(1));

    const selectedTetronimo = TETRONIMOS.find(
      (curr) => curr.name === tetronimoName
    );

    if (!selectedTetronimo) {
      throw new Error("Invalid tetronimo name");
    }

    return { tetronimo: selectedTetronimo, colOffset };
  });

  const turnToAdd = { turns: addedTurn };
  setTurnsList((prevTurns) => [...prevTurns, turnToAdd]);
};

// Helper function to position a new tetronimo on the grid preview
export const positionTetronimoOnGrid = (
  tetronimo: Tetromino,
  xCord: number,
  setTurnSelectorGridPreview: Dispatch<SetStateAction<Grid>>
) => {
  const tetronimoConvertedToGrid = createGrid(
    TETRONIMO_ROW_COUNT,
    TETRONIMO_COL_COUNT,
    tetronimo
  );

  const updatedGrid = mergeGrids(
    createGrid(TETRIS_COL_COUNT, TETRONIMO_ROW_COUNT),
    tetronimoConvertedToGrid,
    {
      colOffset: xCord,
      rowOffset: 0,
    }
  );

  if (updatedGrid !== false) {
    setTurnSelectorGridPreview(updatedGrid);
  }
  return updatedGrid;
};
