import React, { FC } from "react";

import classes from "./ScoreBoard.module.scss";

interface ScoreBoardProps {
  userScore: number;
  computerScore: number;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({
  userScore,
  computerScore,
}) => {
  return (
    <div className={classes.scoreBoard}>
      <h2 className={classes.userScore}>User score: {userScore}</h2>
      <h2 className={classes.computerScore}>Computer Score: {computerScore}</h2>
    </div>
  );
};
