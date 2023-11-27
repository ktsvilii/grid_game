import React, { ChangeEventHandler, FC } from "react";

import classes from "./GameControls.module.scss";

interface TickControlProps {
  tick: number;
  gameStarted: boolean;
  handleTickChange: ChangeEventHandler<HTMLInputElement>;
}

export const TickControl: FC<TickControlProps> = ({
  tick,
  gameStarted,
  handleTickChange,
}) => {
  return (
    <div className={classes.tickControl}>
      <input
        type="number"
        id="tickControlInput"
        value={tick}
        disabled={gameStarted}
        onChange={handleTickChange}
        className={classes.tickControlInput}
      />
      <label htmlFor="tickControlInput" className={classes.tickControlLabel}>
        Set delay of cell change (in ms.)
      </label>
    </div>
  );
};
