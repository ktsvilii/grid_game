import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { DialogWindow } from "../DialogWindow";
import { GameControls } from "../GameControls";
import { Grid } from "../Grid";
import { ScoreBoard } from "../ScoreBoard";
import { useGameBoard } from "./hooks";

import classes from "./GameBoard.module.scss";

export const GameBoard = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [userWin, setUserWin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tick, setTick] = useState(100);

  const {
    gridItems,
    failedCells,
    successCells,
    setUsedCells,
    setSuccessCells,
    setFailedCells,
    setSelectedCell,
    handleCellClick,
  } = useGameBoard({ gameStarted, tick, setUserWin, setModalOpen });

  const closeModal = () => {
    setUsedCells([]);
    setSuccessCells([]);
    setFailedCells([]);
    setSelectedCell(null);
    setGameStarted(false);
    setModalOpen(false);
  };

  useEffect(() => {
    setUserScore(successCells.length);
    setComputerScore(failedCells.length);
  }, [failedCells.length, successCells.length]);

  const runGame = useCallback(() => {
    setGameStarted(!gameStarted);
  }, [gameStarted]);

  const handleTickChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTick(Number((e.target as HTMLInputElement).value));
  }, []);

  return (
    <div className={classes.gameBoard}>
      <ScoreBoard userScore={userScore} computerScore={computerScore} />

      <GameControls
        tick={tick}
        gameStarted={gameStarted}
        runGame={runGame}
        handleTickChange={handleTickChange}
      />

      <Grid gridItems={gridItems} handleCellClick={handleCellClick} />

      <DialogWindow isOpen={modalOpen} userWin={userWin} onClose={closeModal} />
    </div>
  );
};
