import { useState, useCallback } from "react";
import { useGridItems } from "./useGridItems";
import { useGameLogic } from "./useGameLogic";
import { Cell } from "../../../types";

interface UseGameBoardProps {
  gameStarted: boolean;
  tick: number;
  setUserWin: (val: boolean) => void;
  setModalOpen: (val: boolean) => void;
}

interface UseGameBoardResult {
  gridItems: React.ReactElement[];
  failedCells: Cell[];
  successCells: Cell[];
  setUsedCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setSuccessCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setFailedCells: React.Dispatch<React.SetStateAction<Cell[]>>;
  setSelectedCell: React.Dispatch<React.SetStateAction<Cell | null>>;
  handleCellClick: (clickedCell: Cell) => void;
}

export const useGameBoard = ({
  gameStarted,
  tick,
  setUserWin,
  setModalOpen,
}: UseGameBoardProps): UseGameBoardResult => {
  const [usedCells, setUsedCells] = useState<Cell[]>([]);
  const [successCells, setSuccessCells] = useState<Cell[]>([]);
  const [failedCells, setFailedCells] = useState<Cell[]>([]);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [cellClickedWithinTimer, setCellClickedWithinTimer] =
    useState<boolean>(true);

  const handleCellClick = useCallback((clickedCell: Cell) => {
    setSelectedCell((prevSelectedCell: Cell | null) => {
      const { col, row } = clickedCell;

      if (
        prevSelectedCell &&
        prevSelectedCell.row === row &&
        prevSelectedCell.col === col
      ) {
        setSuccessCells((prevSucceededCells) => [
          ...prevSucceededCells,
          { col, row },
        ]);
        setCellClickedWithinTimer(true);
        setUsedCells((prevUsedCells) => [...prevUsedCells, clickedCell]);
      }

      return prevSelectedCell;
    });
  }, []);

  const { items } = useGridItems({
    selectedCell,
    successCells,
    failedCells,
  });

  useGameLogic({
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
  });

  return {
    gridItems: items,
    failedCells,
    successCells,
    setUsedCells,
    setSuccessCells,
    setFailedCells,
    setSelectedCell,
    handleCellClick,
  };
};
