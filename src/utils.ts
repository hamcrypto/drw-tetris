import { Block, BlockColors, Tetromino } from "./types";

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
  const blockGrid: Block[][] = [];

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
  grid1: Block[][],
  grid2: Block[][],
  offset?: Offset
): Block[][] | false {
  const MAX_GRID_WIDTH = 10;

  const maxRows = Math.max(
    grid1.length,
    grid2.length + (offset ? offset.rowOffset : 0)
  );
  const maxCols = MAX_GRID_WIDTH;

  const mergedGrid: Block[][] = [];
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

  const copyBlocks = (sourceGrid: Block[][], isGrid2: boolean = false) => {
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
