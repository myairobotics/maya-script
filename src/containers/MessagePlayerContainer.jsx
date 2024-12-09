import { useState } from "react";
import { MessagePlayerContext } from "../contexts/video-orchestration";
export default function MessagePlayerContainer({ children }) {
  const [status, setStatus] = useState({
    current: null,
    stopped: false,
  });
  const play = (item) => {
    setStatus({
      current: item,
      stopped: false,
    });
  };

  const stop = () => {
    setStatus((prev) => ({ ...prev, stopped: true }));
  };

  return (
    <MessagePlayerContext.Provider
      value={{ current: status.current, play, stopped: status.stopped, stop }}
    >
      {children}
    </MessagePlayerContext.Provider>
  );
}
