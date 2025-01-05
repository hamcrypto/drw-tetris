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
