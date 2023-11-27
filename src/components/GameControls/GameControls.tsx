import React, { ChangeEvent, FC, useCallback } from "react";

import { Button } from "../Button";
import { TickControl } from "../TickControl";

import classes from "./GameControls.module.scss";

interface GameControlsProps {
  tick: number;
  gameStarted: boolean;
  handleTickChange: (e: ChangeEvent<HTMLInputElement>) => void;
  runGame: () => void;
}

export const GameControls: FC<GameControlsProps> = ({
  tick,
  gameStarted,
  handleTickChange,
  runGame,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleTickChange(e);
    },
    [handleTickChange]
  );
  return (
    <div className={classes.controls}>
      <TickControl
        tick={tick}
        gameStarted={gameStarted}
        handleTickChange={handleChange}
      />

      <Button gameStarted={gameStarted} runGame={runGame} />
    </div>
  );
};
