import { useContext, useEffect, useRef, useState } from "react";
import { MessagesContext } from "../contexts/messages.context";
import { PresentationContext } from "../contexts/presentation.context";
import { FeedbackContext } from "../contexts/feedback.context";
import { LoadingContext } from "../contexts/loading.context";

export function useRealtimeResponsesRenderer() {
  const { add } = useContext(MessagesContext);
  const { controller } = useContext(PresentationContext);
  const { request: requestFeedback } = useContext(FeedbackContext);
  const { onLoad } = useContext(LoadingContext);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  const [status, setStatus] = useState({
    currentResponseId: null,
    version: 0,
    free: true,
    started: false,
    complete: false,
    playing: false,
    present: false,
    dispatchAutoMessages: false,
    controllerEngaged: false,
    paused: false,
  });

  const stopCurrent = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (videoRef.current) {
      if (!videoRef.current.ended) {
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const subscriptions = [];
    if (controller) {
      subscriptions.push(
        controller.engaged().subscribe({
          next: (value) => {
            setStatus((prev) => ({ ...prev, controllerEngaged: value }));
          },
        })
      );

      subscriptions.push(
        controller.client.done().subscribe({
          next: () => {
            setStatus((prev) => ({ ...prev, complete: true }));
          },
        })
      );

      subscriptions.push(
        controller.messages().subscribe({
          next: (message) => {
            if (message.type !== "message") {
              return;
            }
            add(message);
            if (message.by === "USER") {
              // controller.notifyCompleted();
              return;
            }
            if (!status.present) {
              onLoad();
            }

            if (message.video_url) {
              setStatus((prev) => ({ ...prev, present: true, playing: true }));
              createAndPlayVideo({
                url: message.video_url,
                onComplete: () => {
                  setStatus((prev) => ({ ...prev, playing: false }));
                  if (message.isQuestion) {
                    requestFeedback();
                  }
                  controller.notifyCompleted();
                },
                serverResponse: true,
                subscriptions,
              });
            } else {
              setTimeout(() => {
                setStatus((prev) => ({ ...prev, playing: false }));
                if (message.isQuestion) {
                  requestFeedback();
                }
                controller.notifyCompleted();
              }, 15000);
            }
          },
        })
      );
    }
    return () => {
      subscriptions.forEach((s) => s?.unsubscribe());
    };
  }, [controller]);

  // this effect should handle when controllerEngaged changed

  const createAndPlayVideo = ({
    url,
    onComplete,
    serverResponse,
    subscriptions,
  }) => {
    stopCurrent();
    const el = document.createElement("video");
    el.src = url;
    el.className += " rounded-3xl h-full";
    if (status.present) {
      el.classList.add("hidden");
    }
    const oldEl = videoRef.current;

    // el.addEventListener("pause", () => {
    //     handleResponseComplete(current, autoMoveNext.current);
    //     autoMoveNext.current = true;
    // });

    el.addEventListener("ended", () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      console.log("video ended");
      onComplete();
    });
    el.addEventListener("abort", () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      console.log("video aborted");
      onComplete();
    });

    el.addEventListener("play", () => {
      if (oldEl) {
        setTimeout(() => {
          containerRef.current.removeChild(oldEl);
        }, 1000);
      }
    });
    videoRef.current = el;
    containerRef.current.appendChild(el);
    el.load();
    if (oldEl) {
      oldEl.classList.add("hidden");
    }
    el.play();
    if (el.duration && serverResponse) {
      const given = el.duration + 0.3 * el.duration;
      console.log("Original duration: %s, timeout for %s", el.duration, given);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        onComplete();
      }, given * 1000);
    }
    el.classList.remove("hidden");
    subscriptions.push(
      controller.client.halted?.().subscribe({
        next: () => {
          if (!el.ended) {
            el.pause();
            if (serverResponse) {
              setStatus((prev) => ({ ...prev, paused: true }));
            }
          }
        },
      })
    );
  };

  return {
    renderOn: (element) => {
      containerRef.current = element;
      setStatus((prev) => ({ ...prev, started: true }));
    },
    present: status.present,
    playing: status.playing,
    complete: status.complete,
  };
}
