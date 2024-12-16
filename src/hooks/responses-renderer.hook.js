import { useContext, useEffect, useRef, useState } from "react";
import { MessagesContext } from "../contexts/messages.context";
import { PresentationContext } from "../contexts/presentation.context";
import { FeedbackContext } from "../contexts/feedback.context";
import { LoadingContext } from "../contexts/loading.context";
import { isFunction } from "lodash";

export function useRealtimeResponsesRenderer() {
  const { add: addMessage, remove: removeMessage } =
    useContext(MessagesContext);
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
      // controller or subscriptions cannot be null or undefined in this block.
      if (isFunction(controller?.client?.done)) {
        subscriptions?.push(
          controller?.client?.done().subscribe({
            next: () => {
              setStatus((prev) => ({ ...prev, complete: true }));
            },
          })
        );
      }

      subscriptions?.push(
        controller?.stopping()?.subscribe({
          next: ({ id }) => {
            if (status.currentResponseId === id) {
              stopCurrent();
              setStatus((prev) => ({ ...prev, currentResponseId: null }));
            }
          },
        })
      );

      subscriptions?.push(
        controller?.removing()?.subscribe({
          next: ({ id }) => {
            removeMessage({ id });
            if (status?.currentResponseId === id) {
              stopCurrent();
              setStatus((prev) => ({ ...prev, currentResponseId: null }));
            }
          },
        })
      );

      subscriptions.push(
        controller.client.notifications().subscribe({
          next: (event) => {
            if (event.type === "select_link") {
              addMessage({
                type: "links",
                by: "ASSISTANT",
                text: "Select link",
                id: `msg_${Date.now()}`,
                links: event.data,
              });
            }
          },
        })
      );

      subscriptions?.push(
        controller?.messages?.()?.subscribe({
          next: (message) => {
            if (message.type !== "message") {
              return;
            }
            addMessage(message);
            if (message.by === "USER" || message.history_item) {
              // controller.notifyCompleted();
              return;
            }
            if (!status.present) {
              onLoad();
            }

            if (message.video_url) {
              setStatus((prev) => ({
                ...prev,
                currentResponseId: message.id,
                present: true,
                playing: true,
              }));
              createAndPlayVideo({
                url: message.video_url,
                onComplete: () => {
                  setStatus((prev) => ({
                    ...prev,
                    currentResponseId: null,
                    playing: false,
                  }));
                  if (message.isQuestion) {
                    requestFeedback();
                  }
                  controller.notifyCompleted();
                },
                serverResponse: true,
                subscriptions,
              });
            } else {
              setStatus((prev) => ({
                ...prev,
                currentResponseId: message.id,
                playing: false,
              }));
              setTimeout(() => {
                setStatus((prev) => ({
                  ...prev,
                  currentResponseId: null,
                  playing: false,
                }));
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
      subscriptions.forEach((s) => s.unsubscribe());
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
    el.classList.add("h-full");
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
        oldEl.classList.add("hidden");
        setTimeout(() => {
          containerRef.current.removeChild(oldEl);
        }, 1000);
      }
      el.classList.remove("hidden");
    });
    videoRef.current = el;
    containerRef.current.appendChild(el);
    el.load();

    el.play();
    if (el.duration && serverResponse) {
      const given = el.duration + 0.3 * el.duration;
      console.log("Original duration: %s, timeout for %s", el.duration, given);
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        onComplete();
      }, given * 1000);
    }
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
