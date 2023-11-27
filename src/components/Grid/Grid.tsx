import React, { FC, MouseEvent } from "react";

import classes from "./Grid.module.scss";
import { Cell } from "../../types";

interface GridProps {
  gridItems: React.ReactElement[];
  handleCellClick: (clickedCell: Cell) => void;
}

export const Grid: FC<GridProps> = ({ gridItems, handleCellClick }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickedCol = Number(
      (e.target as HTMLDivElement).getAttribute("data-col")
    );
    const clickedRow = Number(
      (e.target as HTMLDivElement).getAttribute("data-row")
    );

    if (clickedCol && clickedRow) {
      handleCellClick({ col: clickedCol, row: clickedRow });
    }
  };

  return (
    <div className={classes.gridContainer} onClick={handleClick}>
      {gridItems}
    </div>
  );
};
