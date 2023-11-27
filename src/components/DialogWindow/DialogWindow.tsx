import React, { FC } from "react";

import { WIN_CONDITION } from "../../utils";

import classes from "./DialogWindow.module.scss";

interface DialogWindowProps {
  userWin: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const DialogWindow: FC<DialogWindowProps> = ({
  userWin,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <span className={classes.closeBtn} onClick={onClose}>
          &times;
        </span>
        <h2 className={classes.modalText}>
          {userWin
            ? `User won by getting ${WIN_CONDITION} points! \nCongratulations!`
            : `This time computer won by getting ${WIN_CONDITION} points :( \nTry again!`}
        </h2>
      </div>
    </div>
  );
};
