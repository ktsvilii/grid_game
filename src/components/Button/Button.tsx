import React, { FC } from "react";

import classes from "./Button.module.scss";

interface ButtonProps {
  gameStarted: boolean;
  runGame: () => void;
}

export const Button: FC<ButtonProps> = ({ gameStarted, runGame }) => {
  return (
    <button
      type="button"
      className={classes.gameControlBtn}
      disabled={gameStarted}
      onClick={runGame}
    >
      {gameStarted ? "Game in progress :)" : "Start game!"}
    </button>
  );
};
