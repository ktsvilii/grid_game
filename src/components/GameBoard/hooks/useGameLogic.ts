import React, { FC, useEffect } from "react";
import { WIN_CONDITION, getRandomUniqueCell } from "../../../utils";
import { Cell } from "../../../types";

interface UseGameLogicProps {
  gameStarted: boolean;
  tick: number;
  selectedCell: Cell | null;
  cellClickedWithinTimer: boolean;
  usedCells: Cell[];
  successCells: Cell[];
  failedCells: Cell[];
  setUserWin: (val: boolean) => void;
  setModalOpen: (val: boolean) => void;
  setFailedCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setUsedCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setSelectedCell: (cell: Cell) => void;
  setCellClickedWithinTimer: (val: boolean) => void;
}

export const useGameLogic: FC<UseGameLogicProps> = ({
  gameStarted,
  tick,
  selectedCell,
  cellClickedWithinTimer,
  usedCells,
  successCells,
  failedCells,
  setUserWin,
  setModalOpen,
  setFailedCells,
  setUsedCells,
  setSelectedCell,
  setCellClickedWithinTimer,
}) => {
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (gameStarted) {
      intervalId = setInterval(() => {
        if (
          successCells.length === WIN_CONDITION ||
          failedCells.length === WIN_CONDITION
        ) {
          clearInterval(intervalId);
          setUserWin(successCells.length > failedCells.length);
          setModalOpen(true);
          return;
        }

        if (!cellClickedWithinTimer && selectedCell) {
          setFailedCells((prevFailedCells) => [
            ...prevFailedCells,
            { col: selectedCell.col, row: selectedCell.row },
          ]);
        }

        const newCell = getRandomUniqueCell(usedCells);

        if (newCell) {
          setUsedCells((prevUsedCells) => [...prevUsedCells, newCell]);
          setSelectedCell({ col: newCell.col, row: newCell.row });
          setCellClickedWithinTimer(false);
        }
      }, tick);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [
    usedCells,
    selectedCell,
    cellClickedWithinTimer,
    gameStarted,
    setUserWin,
    successCells.length,
    failedCells.length,
    setModalOpen,
    tick,
    setFailedCells,
    setUsedCells,
    setSelectedCell,
    setCellClickedWithinTimer,
  ]);

  return null;
};
