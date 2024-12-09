import { useContext, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Tooltip } from "react-tooltip";
import { FaMicrophoneAlt } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { MessagePlayerContext } from "../contexts/video-orchestration";
import { trim, uniqueId } from "lodash";
import { FeedbackContext } from "../contexts/feedback.context";
import { PresentationContext } from "../contexts/presentation.context";
import RealtimeConnectionStatusComponent from "./ConnectionStatus";
import { MayaAvatarContext } from "../contexts/avatar.context";
const micButtonId = "mic_button_" + Date.now();

export default function UserResponseComponent({
  onSend,
  disabled,
  sending,
  onCancel,
}) {
  const { stop } = useContext(MessagePlayerContext);
  const {
    isRequesting,
    cancel: cancelFeedback,
    notifyResponding,
  } = useContext(FeedbackContext);
  const { controller } = useContext(PresentationContext);
  const { avatar } = useContext(MayaAvatarContext);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition();

  const inputRef = useRef(null);

  const [fitWidth, setFitWidth] = useState(true);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Your browser does not support speech recognition");
    }
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    setTimeout(() => {
      setFitWidth(false);
    }, 30000);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = transcript;
    }
  }, [transcript]);

  useEffect(() => {
    if (!listening && finalTranscript && !sending) {
      sendResponse();
    }
  }, [listening, finalTranscript, sending]);

  const sendResponse = () => {
    cancelFeedback();
    const msg = trim(inputRef.current?.value || "");
    if (!msg) {
      return;
    }
    stop();
    inputRef.current.value = "";
    onSend({
      content: msg,
      sender: "USER",
      by: "USER",
    });
  };

  const handleKeyDown = (event) => {
    cancelFeedback();
    if (controller) {
      controller.notifyResponding();
    }
    if (/enter/i.test(event.key)) {
      sendResponse();
    } else {
      resetTranscript();
    }
  };

  const toggleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      notifyResponding(false);
    } else {
      SpeechRecognition.startListening({
        continuous: false,
        interimResults: true,
      });
      notifyResponding(true);
    }
  };

  return (
    <div className="p-[0.75rem_1rem] flex items-center justify-center gap-4 h-fit mt-auto">
      {browserSupportsSpeechRecognition && (
        <button
          id={micButtonId}
          onClick={toggleListen}
          disabled={sending}
          className={`text-2xl text-[#0050ff]`}
        >
          {listening ? (
            <i
              className={` ${
                listening ? " text-green-500  animate-pulse" : "text-[#0050ff]"
              }`}
            >
              <FaMicrophoneAlt />
            </i>
          ) : (
            <FaMicrophoneAltSlash />
          )}
        </button>
      )}
      <input
        type="text"
        ref={inputRef}
        disabled={sending}
        onKeyDown={handleKeyDown}
        className="w-full bg-[#e5e7eb] rounded-3xl py-2.5 px-4 outline-none text-sm text-[#2d2d2f]"
        placeholder="Aa"
      />
      {sending ? (
        <div
          onClick={onCancel}
          className="relative cursor-pointer flex justify-center items-center"
        >
          <div className="absolute animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-purple-500"></div>
          <img src={avatar?.image} className="rounded-full h-6 w-6" />
        </div>
      ) : (
        <button
          onClick={sendResponse}
          disabled={sending}
          className="text-2xl text-[#0050ff]"
        >
          <IoSend />
        </button>
      )}
      <Tooltip
        anchorSelect={`#${micButtonId}`}
        content="Tap to Speak"
        place="top"
        isOpen={isRequesting}
      />
      <RealtimeConnectionStatusComponent />
    </div>
  );
}
