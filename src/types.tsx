export type BlockColors =
  | "Cyan"
  | "Blue"
  | "Orange"
  | "Yellow"
  | "Green"
  | "Purple"
  | "Red"
  | "White";

export interface Block {
  color: BlockColors;
  filled: boolean;
  xCord: number;
  yCord: number;
}
