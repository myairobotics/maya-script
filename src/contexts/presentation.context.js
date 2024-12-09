import { noop } from "lodash";
import { createContext } from "react";

export const PresentationContext = createContext({
  controller: null,
  setController: noop,
  loaded: false,
});
