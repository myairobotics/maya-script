import { noop } from "lodash";
import { createContext } from "react";

export const FeedbackContext = createContext({
  isRequesting: false,
  request: noop,
  notifyResponseReceived: noop,
  noResponse: false,
  cancel: noop,
  preparing: false,
  notifyResponding: noop,
});
