import { COLS, ROWS } from "./globalVars";

import { Cell } from "../types";

export const getKey = (i: number, j: number) => `item-${i}-${j}`;

export const getRandomUniqueCell = (usedCells: Cell[]): Cell => {
  const randomRow = Math.floor(Math.random() * ROWS);
  const randomCol = Math.floor(Math.random() * COLS);

  const isUnique = !usedCells.some(
    (cell) => cell.col === randomCol && cell.row === randomRow
  );

  return isUnique
    ? { col: randomCol, row: randomRow }
    : getRandomUniqueCell(usedCells);
};
