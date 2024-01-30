import { KeyOf } from "~/models/common";
import {
  LOST_AND_FOUND_LOUNGE_FILTER_LIST,
  인기분실물_FILTER_LIST,
} from "../static/filter";

export type LOST_AND_FOUND_LOUNGE_FILTER_TYPES = KeyOf<
  typeof LOST_AND_FOUND_LOUNGE_FILTER_LIST
>;

export type 인기분실물_FILTER_TYPES = KeyOf<typeof 인기분실물_FILTER_LIST>;
