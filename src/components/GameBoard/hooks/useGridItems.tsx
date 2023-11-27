import React, { ReactElement } from "react";
import classNames from "classnames";

import { COLS, ROWS, getKey } from "../../../utils";
import { Cell } from "../../../types";

import classes from "../GameBoard.module.scss";

interface UseGridItemsProps {
  selectedCell: Cell | null;
  successCells: Cell[];
  failedCells: Cell[];
}

export const useGridItems = ({
  selectedCell,
  successCells,
  failedCells,
}: UseGridItemsProps) => {
  const items: ReactElement[] = [];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const currentlySelectedCell =
        selectedCell && selectedCell.row === i && selectedCell.col === j;
      const previouslyFailedCell = failedCells.some(
        (failedCell) => failedCell.col === j && failedCell.row === i
      );
      const previouslySucceededCell = successCells.some(
        (successCell) => successCell.col === j && successCell.row === i
      );

      const key = getKey(i, j);

      items.push(
        <div
          key={key}
          data-col={j}
          data-row={i}
          className={classNames([
            classes.gridItem,
            {
              [classes.yellowCell]: currentlySelectedCell,
              [classes.redCell]: previouslyFailedCell,
              [classes.greenCell]: previouslySucceededCell,
            },
          ])}
        ></div>
      );
    }
  }

  return { items };
};
