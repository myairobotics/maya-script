import { useCallback, useEffect, useContext, useRef, useState } from "react";
import { FeedbackContext } from "../contexts/feedback.context";
import { debounce, noop } from "lodash";
import { VideosOrchestratorContext } from "../contexts/video-orchestration";

const MAX_ATTEMPT = 3;

export default function FeedbackContainer({ children }) {
  const [status, setStatus] = useState({
    requested: false,
    expecting: false,
    preparing: false,
    noResponse: false,
    attempt: 0,
  });
  const timeoutHandle = useRef(null);

  const cancelFeedbackRequired = () => {
    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
      timeoutHandle.current = null;
    }
    if (status.requested || status.preparing) {
      setStatus((prev) => ({
        ...prev,
        requested: false,
        expecting: false,
        preparing: false,
      }));
    }
  };

  const responding = (r) => setStatus((prev) => ({ ...prev, preparing: r }));

  const requestFeedback = () => {
    if (status.expecting) {
      return;
    }
    setStatus((prev) => ({
      ...prev,
      expecting: true,
      attempt: 1,
      requested: true,
    }));
  };

  useEffect(() => {
    if (status.requested) {
      if (timeoutHandle.current) {
        clearTimeout(timeoutHandle.current);
      }
      timeoutHandle.current = setTimeout(() => {
        timeoutHandle.current = null;
        cancelFeedbackRequired();
      }, 3000);
    }
  }, [status.requested]);

  const responded = (moveToNext) => {
    setStatus((prev) => ({
      ...prev,
      expecting: false,
      preparing: false,
      attempt: 0,
    }));

    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
      timeoutHandle.current = null;
    }
  };
  return (
    <FeedbackContext.Provider
      value={{
        isRequesting: status.requested,
        preparing: status.preparing,
        notifyResponding: responding,
        cancel: cancelFeedbackRequired,
        noResponse: status.noResponse,
        notifyResponseReceived: responded,
        request: requestFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
