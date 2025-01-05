import { BlockColors, Tetromino } from "./types";

export const TETRONIMO_Q: Tetromino = {
  coordinates: [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "Q",
  color: BlockColors.CYAN,
};

export const TETRONIMO_Z: Tetromino = {
  coordinates: [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "Z",
  color: BlockColors.BLUE,
};

export const TETRONIMO_S: Tetromino = {
  coordinates: [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "S",
  color: BlockColors.ORANGE,
};

export const TETRONIMO_T: Tetromino = {
  coordinates: [
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "T",
  color: BlockColors.YELLOW,
};

export const TETRONIMO_I: Tetromino = {
  coordinates: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "I",
  color: BlockColors.GREEN,
};

export const TETRONIMO_L: Tetromino = {
  coordinates: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "L",
  color: BlockColors.PURPLE,
};

export const TETRONIMO_J: Tetromino = {
  coordinates: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  name: "J",
  color: BlockColors.RED,
};

export const TETRONIMOS = [
  TETRONIMO_Q,
  TETRONIMO_Z,
  TETRONIMO_S,
  TETRONIMO_T,
  TETRONIMO_I,
  TETRONIMO_L,
  TETRONIMO_J,
];
