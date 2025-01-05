import { Block } from "../../types";
import "./styles.css";
interface GridDisplayProps {
  gridState: Block[][];
}

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
function GridDisplay({ gridState = [] }: GridDisplayProps) {
  return (
    <table>
      {gridState.map((arrayColumn) => (
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
