import { Block, BlockColors } from "../../types";
import "./styles.css";
interface GridDisplayProps {
  columnCount: number;
  rowCount: number;
}

const blockBuilder = ({
  color = "White" as BlockColors,
  filled = false,
  xCord = 0,
  yCord = 0,
}) => {
  const newBlock: Block = { color, filled, xCord, yCord };
  return newBlock;
};

const gridBuilder = (columnCount: number, rowCount: number) => {
  const blockGrid: Block[][] = [];
  for (let currentRow = 0; currentRow < rowCount; currentRow++) {
    blockGrid[currentRow] = [];
    for (let currentCol = 0; currentCol < columnCount; currentCol++) {
      blockGrid[currentRow][currentCol] = blockBuilder({
        xCord: currentCol,
        yCord: currentRow,
      });
    }
  }

  return blockGrid;
};

const GridBlock = ({ color, xCord, yCord, filled }: Block) => {
  return (
    <td
      style={{
        backgroundColor: color,
      }}
      onMouseOver={() => console.log({ color, xCord, yCord, filled })}
    ></td>
  );
};
function GridDisplay({ columnCount, rowCount }: GridDisplayProps) {
  const initialArray = gridBuilder(columnCount, rowCount);
  return (
    <table>
      {initialArray.map((arrayColumn) => (
        <tr>
          {arrayColumn.map((arrayRow) => (
            <GridBlock {...arrayRow} />
          ))}
        </tr>
      ))}
    </table>
  );
}

export default GridDisplay;
