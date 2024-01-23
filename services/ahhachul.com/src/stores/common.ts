import React from "react";
import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

import type { Toast } from "~/components/shared/toast/core/types";

const modalCompoState = atom<React.ReactNode[] | []>({
  key: `modalCompoState/${uuidv4()}`,
  default: [],
});

const toastState = atom<[] | Toast[]>({
  key: `toastState/${uuidv4()}`,
  default: [],
});

const isModalOpenState = atom({
  key: `isModalOpenState/${uuidv4()}`,
  default: false,
});

const isTimeStartAtom = atom({
  key: `isTimeStartAtom/${uuidv4()}`,
  default: false,
});

const isTimeOutAtom = atom({
  key: `isTimeOutAtom/${uuidv4()}`,
  default: false,
});

const isTimeResetAtom = atom({
  key: `isTimeResetAtom/${uuidv4()}`,
  default: false,
});

export {
  modalCompoState,
  toastState,
  isModalOpenState,
  isTimeStartAtom,
  isTimeOutAtom,
  isTimeResetAtom,
};
