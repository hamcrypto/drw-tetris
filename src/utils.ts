import { TETRIS_COL_COUNT } from "./constants";
import { Block, BlockColors, Grid, Tetromino, Turn } from "./types";

// Helper function to create a block
const createBlock = ({
  color = "White" as BlockColors,
  filled = false,
  xCord = 0,
  yCord = 0,
}): Block => ({ color, filled, xCord, yCord });

export const createGrid = (
  columnCount: number,
  rowCount: number,
  tetromino?: Tetromino
): Grid => {
  const grid: Grid = [];

  for (let row = 0; row < rowCount; row++) {
    grid[row] = [];
    for (let col = 0; col < columnCount; col++) {
      const isFilled = Boolean(tetromino?.coordinates[row][col]);
      const blockColor = isFilled ? tetromino?.color : undefined;

      grid[row][col] = createBlock({
        xCord: col,
        yCord: row,
        filled: isFilled,
        color: blockColor,
      });
    }
  }

  return grid;
};

interface Offset {
  rowOffset: number;
  colOffset: number;
}

const copyBlocks = (
  sourceGrid: Grid,
  mergedGrid: Grid,
  maxRows: number,
  maxCols: number,
  offset?: Offset
) => {
  for (let row = 0; row < sourceGrid.length; row++) {
    for (let col = 0; col < sourceGrid[row].length; col++) {
      const sourceBlock = sourceGrid[row][col];

      const targetRow = offset ? row + offset.rowOffset : row;
      const targetCol = offset ? col + offset.colOffset : col;

      if (
        targetRow >= 0 &&
        targetRow < maxRows &&
        targetCol >= 0 &&
        targetCol < maxCols
      ) {
        const targetBlock = mergedGrid[targetRow][targetCol];

        if (sourceBlock.filled) {
          if (targetBlock.filled) {
            return false; // Collision detected
          } else {
            targetBlock.filled = true;
            targetBlock.color = sourceBlock.color;
          }
        }
      } else if (sourceBlock.filled) {
        return false; // Block goes out of bounds
      }
    }
  }
  return mergedGrid;
};

export function mergeGrids(
  grid1: Grid,
  grid2: Grid,
  offset?: Offset
): Grid | false {
  const maxRows = Math.max(
    grid1.length,
    grid2.length + (offset ? offset.rowOffset : 0)
  );
  const maxCols = TETRIS_COL_COUNT;
  const mergedGrid: Grid = createEmptyGrid(maxRows, maxCols);

  if (
    !copyBlocks(grid1, mergedGrid, maxRows, maxCols) ||
    !copyBlocks(grid2, mergedGrid, maxRows, maxCols, offset)
  ) {
    return false; // Error during merging
  }

  return mergedGrid;
}

export const convertTurnToString = (turns: Turn[]): string =>
  turns.map((turn) => `${turn.tetronimo.name}${turn.colOffset}`).join(",");

export const getFilledHeight = (grid: Grid): number => {
  const gridHeight = grid.length;

  for (let row = 0; row < gridHeight; row++) {
    if (grid[row].some((block) => block.filled)) {
      return gridHeight - row;
    }
  }

  return 0;
};

const createEmptyGrid = (rows: number, cols: number): Grid => {
  const grid: Grid = [];
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < cols; col++) {
      grid[row][col] = createBlock({ xCord: col, yCord: row });
    }
  }
  return grid;
};

export const addEmptyRows = (grid: Grid, numRows: number): Grid => {
  const gridWidth = grid[0].length;
  const newGrid = createEmptyGrid(numRows, gridWidth);

  newGrid.push(...grid);

  updateBlockYCoordinates(newGrid);

  return newGrid;
};

const updateBlockYCoordinates = (grid: Grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col].yCord = row;
    }
  }
};

// Function to drop a tetromino onto a grid
export const dropTetromino = (
  grid: Grid,
  tetromino: Tetromino,
  colOffset: number
): Grid => {
  const initialGridHeight = grid?.length;
  const gridWidth = grid[0]?.length;
  let newGrid = [...grid];

  if (initialGridHeight - getFilledHeight(grid) < 4) {
    newGrid = addEmptyRows(grid, 5);
  }

  const tetrominoHeight = tetromino.coordinates.length;
  const tetrominoWidth = tetromino.coordinates[0].length;

  // Create a copy of the grid to avoid modifying the original
  newGrid = newGrid.map((row) => row.map((block) => ({ ...block })));

  // Find the lowest possible position to place the tetromino
  const gridHeight = newGrid.length;
  let rowOffset = 0;
  for (let row = 0; row < gridHeight; row++) {
    let canPlace = true;
    for (let tRow = 0; tRow < tetrominoHeight; tRow++) {
      for (let tCol = 0; tCol < tetrominoWidth; tCol++) {
        if (tetromino.coordinates[tRow][tCol] === 1) {
          const gridRow = row + tRow;
          const gridCol = colOffset + tCol;

          if (gridCol < 0 || gridCol >= gridWidth) {
            canPlace = false;
            break;
          }

          if (gridRow >= gridHeight || newGrid[gridRow][gridCol].filled) {
            canPlace = false;
            break;
          }
        }
      }
      if (!canPlace) break;
    }

    if (canPlace) {
      rowOffset = row;
    } else {
      rowOffset = row - 1;
      break;
    }
  }

  // Place the tetromino on the grid
  for (let tRow = 0; tRow < tetrominoHeight; tRow++) {
    for (let tCol = 0; tCol < tetrominoWidth; tCol++) {
      if (tetromino.coordinates[tRow][tCol] === 1) {
        const gridRow = rowOffset + tRow;
        const gridCol = colOffset + tCol;
        if (
          gridRow >= 0 &&
          gridRow < gridHeight &&
          gridCol >= 0 &&
          gridCol < gridWidth
        ) {
          newGrid[gridRow][gridCol] = createBlock({
            color: tetromino.color,
            filled: true,
            xCord: gridCol,
            yCord: gridRow,
          });
        }
      }
    }
  }

  // Clear any full rows
  let rowsCleared = 0;
  for (let row = gridHeight - 1; row >= 0; row--) {
    const isRowFull = newGrid[row].every((block) => block.filled);
    if (isRowFull) {
      newGrid.splice(row, 1);
      rowsCleared++;
    }
  }

  // Add new empty rows if any were cleared
  if (rowsCleared > 0) {
    newGrid.unshift(
      ...createEmptyGrid(rowsCleared, gridWidth).map((row, index) => {
        row.forEach((block) => (block.yCord = index));
        return row;
      })
    );
  }

  updateBlockYCoordinates(newGrid);

  return newGrid;
};
