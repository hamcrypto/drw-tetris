export const BlockColors = {
  CYAN: "Cyan",
  BLUE: "Blue",
  ORANGE: "Orange",
  YELLOW: "Yellow",
  GREEN: "Green",
  PURPLE: "Purple",
  RED: "Red",
  WHITE: "White",
} as const;

export type BlockColors = (typeof BlockColors)[keyof typeof BlockColors];

export type Grid = Block[][];
export interface Block {
  color: BlockColors;
  filled: boolean;
  xCord: number;
  yCord: number;
}

export interface Tetromino {
  coordinates: (0 | 1)[][];
  color: BlockColors;
  name: string;
}

export interface Turn {
  tetronimo: Tetromino;
  colOffset: number;
}

export interface TurnResult {
  outputGrid: Grid;
  blockHeight: number;
}
export interface TurnsListItem {
  turns: Turn[];
  result?: TurnResult;
}

export type TurnsList = TurnsListItem[];
