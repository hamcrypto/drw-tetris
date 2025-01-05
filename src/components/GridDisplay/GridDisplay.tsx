import { Block, BlockColors } from "../../types";
import "./styles.css";
interface GridDisplayProps {
  width: number;
  height: number;
}

const blockBuilder = ({
  color = "White" as BlockColors,
  filled = false,
  xcord = 0,
  ycord = 0,
}) => {
  const newBlock: Block = { color, filled, xcord, ycord };
  return newBlock;
};

function GridDisplay({ width, height }: GridDisplayProps) {
  const initialArray = Array(width)
    .fill(null)
    .map(() => Array(height).fill(blockBuilder({})));

  return (
    <table>
      {initialArray.map((arrayColumn) => (
        <tr>
          {arrayColumn.map((arrayRow) => (
            <td
              style={{
                backgroundColor: arrayRow["color"],
              }}
            ></td>
          ))}
        </tr>
      ))}
    </table>
  );
}

export default GridDisplay;
