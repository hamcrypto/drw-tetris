import { Block, BlockColors, Grid, Tetromino, Turn } from "./types";

const blockBuilder = ({
  color = "White" as BlockColors,
  filled = false,
  xCord = 0,
  yCord = 0,
}) => {
  const newBlock: Block = { color, filled, xCord, yCord };
  return newBlock;
};

export const gridBuilder = (
  columnCount: number,
  rowCount: number,
  input?: Tetromino
) => {
  const blockGrid: Grid = [];

  // Input is a tetronimo
  for (let currentRow = 0; currentRow < rowCount; currentRow++) {
    blockGrid[currentRow] = [];
    for (let currentCol = 0; currentCol < columnCount; currentCol++) {
      const filled = Boolean(input?.coordinates[currentRow][currentCol]);
      const color = filled ? input?.color : undefined;

      blockGrid[currentRow][currentCol] = blockBuilder({
        xCord: currentCol,
        yCord: currentRow,
        filled,
        color: color,
      });
    }
  }

  return blockGrid;
};

interface Offset {
  rowOffset: number;
  colOffset: number;
}

export function mergeBlockArrays(
  grid1: Grid,
  grid2: Grid,
  offset?: Offset
): Grid | false {
  const MAX_GRID_WIDTH = 10;

  const maxRows = Math.max(
    grid1.length,
    grid2.length + (offset ? offset.rowOffset : 0)
  );
  const maxCols = MAX_GRID_WIDTH;

  const mergedGrid: Grid = [];
  for (let i = 0; i < maxRows; i++) {
    mergedGrid[i] = [];
    for (let j = 0; j < maxCols; j++) {
      mergedGrid[i][j] = {
        color: "White",
        filled: false,
        xCord: j,
        yCord: i,
      };
    }
  }

  const copyBlocks = (sourceGrid: Grid, isGrid2: boolean = false) => {
    for (let i = 0; i < sourceGrid.length; i++) {
      for (let j = 0; j < sourceGrid[i].length; j++) {
        const sourceBlock = sourceGrid[i][j];

        const targetRow = isGrid2 && offset ? i + offset.rowOffset : i;
        const targetCol = isGrid2 && offset ? j + offset.colOffset : j;

        if (
          targetRow >= 0 &&
          targetRow < maxRows &&
          targetCol >= 0 &&
          targetCol < maxCols
        ) {
          const targetBlock = mergedGrid[targetRow][targetCol];

          if (sourceBlock.filled) {
            if (targetBlock.filled) {
              return false;
            } else {
              targetBlock.filled = true;
              targetBlock.color = sourceBlock.color;
            }
          }
        } else if (sourceBlock.filled) {
          // Only return an error if a 'filled' block goes out of bounds
          return false;
        }
      }
    }
    return true;
  };

  if (!copyBlocks(grid1) || !copyBlocks(grid2, true)) {
    return false;
  }

  return mergedGrid;
}

// Taken from https://github.com/martinstark/throttle-ts/blob/main/src/index.ts
export const throttle = <R, A extends unknown[]>(
  fn: (...args: A) => R,
  delay: number
): [(...args: A) => R | undefined, () => void, () => void] => {
  let wait = false;
  let timeout: undefined | number;
  let cancelled = false;

  function resetWait() {
    wait = false;
  }

  return [
    (...args: A) => {
      if (cancelled) return undefined;
      if (wait) return undefined;

      const val = fn(...args);

      wait = true;

      timeout = window.setTimeout(resetWait, delay);

      return val;
    },
    () => {
      cancelled = true;
      clearTimeout(timeout);
    },
    () => {
      clearTimeout(timeout);
      resetWait();
    },
  ];
};

export const convertTurnToString = (turns: Turn[]) =>
  turns
    .map(
      (currentTurn) => `${currentTurn.tetronimo.name}${currentTurn.colOffset}`
    )
    .join(",");

export const dropTetromino = (
  grid: Grid,
  tetromino: Tetromino,
  colOffset: number
): Grid => {
  const initialGridHeight = grid?.length;
  const gridWidth = grid[0]?.length;

  const headspace = getGridHeight(grid) - initialGridHeight;
  console.log({ maxHeight: getGridHeight(grid), initialGridHeight, headspace });
  if (initialGridHeight - getGridHeight(grid) < 4) {
    grid = addEmptyRowsToTop(grid, 5);
  }

  const tetrominoHeight = tetromino.coordinates.length;
  const tetrominoWidth = tetromino.coordinates[0].length;

  // 1. Check if adding rows is necessary
  const addRowsNeeded = false;
  // for (let tRow = 0; tRow < tetrominoHeight; tRow++) {
  //   for (let tCol = 0; tCol < tetrominoWidth; tCol++) {
  //     if (tetromino.coordinates[tRow][tCol] === 1) {
  //       const gridRow = -tetrominoHeight + tRow; // Check for placement above the grid
  //       if (gridRow < 0) {
  //         addRowsNeeded = true;
  //         break;
  //       }
  //     }
  //   }
  //   if (addRowsNeeded) break;
  // }

  // 2. Calculate rows needed and starting position
  let rowsNeeded = 0;
  let startRow = 0; // Where to start placing the tetromino (may be negative if adding rows)
  if (addRowsNeeded) {
    for (let row = 0; row < tetrominoHeight; row++) {
      let canPlace = true;
      for (let tRow = 0; tRow < tetrominoHeight; tRow++) {
        for (let tCol = 0; tCol < tetrominoWidth; tCol++) {
          if (tetromino.coordinates[tRow][tCol] === 1) {
            const gridRow = row - tetrominoHeight + tRow; // Check for placement above the grid
            if (gridRow >= 0) {
              canPlace = false;
            }
          }
        }
        if (!canPlace) break;
      }

      if (canPlace) {
        rowsNeeded = tetrominoHeight - row;
        startRow = row - tetrominoHeight; // Negative value indicates adding rows
        break;
      }
    }
  }

  // 3. Create new grid (add rows if needed)
  let newGrid: Grid = [];
  if (addRowsNeeded) {
    for (let i = 0; i < rowsNeeded; i++) {
      newGrid.push(
        Array.from({ length: gridWidth }, (_, j) => ({
          color: BlockColors.WHITE,
          filled: false,
          xCord: j,
          yCord: i,
        }))
      );
    }
    newGrid = newGrid.concat(
      grid.map((row) => row.map((block) => ({ ...block })))
    );
  } else {
    newGrid = grid.map((row) => row.map((block) => ({ ...block })));
  }

  // 4. Update y-coordinates in the new grid
  for (let y = 0; y < newGrid.length; y++) {
    for (let x = 0; x < newGrid[y].length; x++) {
      newGrid[y][x].yCord = y;
    }
  }

  // 5. Find the lowest possible position in the new grid
  const gridHeight = newGrid.length;
  let rowOffset = Math.max(0, -startRow);
  for (let row = rowOffset; row < gridHeight; row++) {
    let canPlace = true;
    for (let tRow = 0; tRow < tetrominoHeight; tRow++) {
      for (let tCol = 0; tCol < tetrominoWidth; tCol++) {
        if (tetromino.coordinates[tRow][tCol] === 1) {
          const gridRow = row + tRow;
          const gridCol = colOffset + tCol;

          // Check for out of bounds
          if (gridCol < 0 || gridCol >= gridWidth) {
            canPlace = false;
            break;
          }

          // Check for collision
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

  // 6. Place the tetromino
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
          newGrid[gridRow][gridCol] = {
            color: tetromino.color,
            filled: true,
            xCord: gridCol,
            yCord: gridRow,
          };
        }
      }
    }
  }

  // 7. Clear full rows
  let rowsCleared = 0;
  for (let y = gridHeight - 1; y >= 0; y--) {
    const isRowFull = newGrid[y].every((block) => block.filled);
    if (isRowFull) {
      newGrid.splice(y, 1); // Remove the row
      rowsCleared++;
    }
  }

  // 8. Add new empty rows at the top if any were cleared
  for (let i = 0; i < rowsCleared; i++) {
    newGrid.unshift(
      Array.from({ length: gridWidth }, (_, j) => ({
        color: BlockColors.WHITE, // Or your desired empty color
        filled: false,
        xCord: j,
        yCord: i,
      }))
    );
  }

  // 9. Update y-coordinates after clearing rows
  for (let y = 0; y < newGrid.length; y++) {
    for (let x = 0; x < newGrid[y].length; x++) {
      newGrid[y][x].yCord = y;
    }
  }

  return newGrid;
};

export const getGridHeight = (grid: Grid): number => {
  const gridHeight = grid.length;

  for (let y = 0; y < gridHeight; y++) {
    if (grid[y].some((block) => block.filled)) {
      return gridHeight - y;
    }
  }

  return 0;
};

export const addEmptyRowsToTop = (grid: Grid, numRowsToAdd: number): Grid => {
  const gridWidth = grid[0].length;
  const newGrid: Grid = [];

  // Create new empty rows
  for (let i = 0; i < numRowsToAdd; i++) {
    newGrid.push(
      Array.from({ length: gridWidth }, (_, j) => ({
        color: BlockColors.WHITE, // Or your desired empty color
        filled: false,
        xCord: j,
        yCord: i, // Initial y-coordinate will be updated later
      }))
    );
  }

  // Add the existing rows below the new rows
  newGrid.push(...grid);

  // Update y-coordinates of all rows
  for (let y = 0; y < newGrid.length; y++) {
    for (let x = 0; x < newGrid[y].length; x++) {
      newGrid[y][x].yCord = y;
    }
  }

  return newGrid;
};
