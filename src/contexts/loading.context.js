import { noop } from "lodash";
import { createContext } from "react";

export const LoadingContext = createContext({
  message: null,
  loading: true,
  error: false,
  loaded: false,
  onError: noop,
  onLoad: noop,
  reset: noop,
  changeMessage: noop,
  retrying: false,
  retry: noop,
});
