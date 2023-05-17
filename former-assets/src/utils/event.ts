import mixpanel from "mixpanel-browser";

import { event } from "@/libs/gtag";

import { isProd } from "./common";

type GAEventProps = Parameters<typeof event>[0];
type Props = Omit<GAEventProps, "category">;

const recordEvent = ({ action, label, value }: Props) => {
  if (!isProd(process.env.NODE_ENV)) return;

  event({ action, category: process.env.WEB_VERSION, label, value });
  mixpanel.track(action, { category: process.env.WEB_VERSION, label, value });
};

export default recordEvent;
