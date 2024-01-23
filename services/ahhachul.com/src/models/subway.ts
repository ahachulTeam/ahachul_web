import { SUBWAY_LINE_FILTER_TYPE } from "~/constants/filter";
import { KeyOf } from "./common";

export type SubwayLineIdType = KeyOf<typeof SUBWAY_LINE_FILTER_TYPE>;
