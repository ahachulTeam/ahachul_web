import { ReactElement } from "react";

import { KeyOf } from "~/models/common";
import { COMPLAINTS_CONTENTS } from "../static/contents";

export type COMPLAINTS_CONTENTS_TYPES = KeyOf<typeof COMPLAINTS_CONTENTS>;

export type COMPLAINTS_ROOM_SERVICE_INFO_TYPES = {
  [key in COMPLAINTS_CONTENTS_TYPES]: {
    title: string;
    subTitle: string;
    selectList: { [key: string]: string };
    iconList?: { [key: string]: ReactElement };
    secondarySelectList?: { [key: string]: string };
    activeColor?: {
      [key: string]: {
        backgroundColor: string;
        borderColor: string;
        pointColor: string;
      };
    };
  };
};
