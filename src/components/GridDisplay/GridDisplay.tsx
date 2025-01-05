import { Block } from "../../types";
import "./styles.css";

interface BlockOptions {
  onMouseOver?: (e: React.MouseEvent<HTMLElement>, block: Block) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, block: Block) => void;
}

export interface GridOptions {
  onMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  blockOptions?: BlockOptions;
}

interface GridDisplayProps {
  gridState: Block[][];
  gridOptions?: GridOptions;
  style?: React.CSSProperties;
}

interface GridBlockProps {
  block: Block;
  blockOptions?: BlockOptions;
}

const GridBlock = ({ block, blockOptions }: GridBlockProps) => {
  const { color } = block;

  const mouseOverHandler = blockOptions?.onMouseOver
    ? (event: React.MouseEvent<HTMLElement>) =>
        blockOptions.onMouseOver!(event, block)
    : undefined;

  const clickHandler = blockOptions?.onClick
    ? (event: React.MouseEvent<HTMLElement>) =>
        blockOptions.onClick!(event, block)
    : undefined;

  return (
    <td
      style={{
        backgroundColor: color,
      }}
      onMouseOver={mouseOverHandler}
      onClick={clickHandler}
    ></td>
  );
};
function GridDisplay({
  gridState = [],
  gridOptions = {},
  style,
}: GridDisplayProps) {
  const { onClick, onMouseOver } = gridOptions;
  return (
    <table onMouseOver={onMouseOver} onClick={onClick} style={style}>
      <tbody>
        {gridState.map((arrayColumn, rowIndex) => (
          <tr key={rowIndex}>
            {arrayColumn.map((arrayRow, columnIndex) => (
              <GridBlock
                block={arrayRow}
                blockOptions={gridOptions.blockOptions}
                key={columnIndex}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GridDisplay;
