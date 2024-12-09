import { noop } from "lodash";
import { createContext } from "react";

export const MessagesContext = createContext({
  messages: [],
  load: noop,
  add: noop,
  clear: noop,
  update: noop,
});
