import { describe, it, expect } from "vitest";
import {
  createGrid,
  mergeGrids,
  convertTurnToString,
  getFilledHeight,
} from "./utils";
import { BlockColors, Grid, Turn } from "./types";
import { TETRONIMO_I, TETRONIMO_Q } from "./constants";

describe("Utils Tests", () => {
  describe("createGrid", () => {
    it("should create an empty grid with specified dimensions", () => {
      const grid = createGrid(5, 10);
      expect(grid.length).toBe(10);
      expect(grid[0].length).toBe(5);
      grid.forEach((row) =>
        row.forEach((block) => {
          expect(block.filled).toBe(false);
          expect(block.color).toBe(BlockColors.WHITE);
        })
      );
    });
  });

  describe("mergeGrids", () => {
    it("should return false if there is a collision", () => {
      const grid1: Grid = createGrid(2, 2, {
        coordinates: [
          [1, 1],
          [1, 1],
        ],
        color: BlockColors.YELLOW,
        name: "O",
      });
      const grid2: Grid = createGrid(2, 2, {
        coordinates: [
          [1, 1],
          [1, 1],
        ],
        color: BlockColors.YELLOW,
        name: "O",
      });

      const mergedGrid = mergeGrids(grid1, grid2, {
        rowOffset: 0,
        colOffset: 0,
      });
      expect(mergedGrid).toBe(false);
    });
  });

  describe("convertTurnToString", () => {
    it("should convert an array of turns to a string", () => {
      const turns: Turn[] = [
        {
          tetronimo: TETRONIMO_Q,
          colOffset: 2,
        },
        {
          tetronimo: TETRONIMO_Q,
          colOffset: 4,
        },
        {
          tetronimo: TETRONIMO_I,
          colOffset: 2,
        },
      ];
      const turnsString = convertTurnToString(turns);
      expect(turnsString).toBe("Q2,Q4,I2");
    });
  });

  describe("getFilledHeight", () => {
    it("should return 0 for an empty grid", () => {
      const grid = createGrid(5, 10);
      const height = getFilledHeight(grid);
      expect(height).toBe(0);
    });

    it("should return the correct height for a grid with filled blocks", () => {
      const grid = createGrid(5, 10);
      grid[8][1].filled = true;
      grid[9][1].filled = true;
      const height = getFilledHeight(grid);
      expect(height).toBe(2);
    });
  });
});
