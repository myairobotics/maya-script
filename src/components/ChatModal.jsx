import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { FaMicrophoneLines, FaMicrophoneLinesSlash } from "react-icons/fa6";
import MessagePlayerContainer from "../containers/MessagePlayerContainer";
import { MessagesContext } from "../contexts/messages.context";
import { useWebClient } from "../hooks/web-client.hook";
import Loader from "./Loader";
import ChatMessagesComponent from "./ChatMessages";
import MessagePlayerComponent from "./MessagePlayer.jsx";
import { MayaAvatarContext } from "../contexts/avatar.context.js";

const ChatModal = ({ onClose, messages, sendMessage, bucketId }) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messagesVersion, setMessagesVersion] = useState(0);
  const messagesRef = useRef([]);
  const realtimeAgent = useWebClient({ bucket_id: bucketId });
  const { avatar } = useContext(MayaAvatarContext);

  const messageList = useMemo(() => messagesRef.current, [messagesVersion]);

  const insertMessage = (message) => {
    messagesRef.current.push(message);
    setMessagesVersion(messagesVersion + (1 % 4));
  };

  const updateMessage = (message) => {
    messagesRef.current = messagesRef.current.map((m) => {
      if (m.id === message.id) {
        return { ...m, ...message };
      }
      return m;
    });
    setMessagesVersion(messagesVersion + (1 % 4));
  };

  const replaceMessages = (list) => {
    messagesRef.current = list;
    setMessagesVersion((messagesVersion + 1) % 4);
  };

  const clearMessages = () => {
    replaceMessages([]);
  };
  useEffect(() => {
    if (realtimeAgent.loaded) {
      realtimeAgent.connect();
    }
  }, [realtimeAgent.loaded]);

  return (
    <div className="fixed bottom-4 right-4 z-[10000]">
      <div
        className="h-fit w-[400px] flex flex-col absolute bottom-4 right-4 
        bg-transparent overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="p-[0.45rem_0.8rem] flex items-center justify-between rounded-[15px] h-fit">
          <div className="flex items-center gap-[0.45rem]">
            <img
              src={avatar.image}
              alt="Maya"
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="flex items-center text-[#242426] text-[0.8rem] font-semibold font-['Rubik']">
              Maya AI
            </div>
          </div>
          <IoClose
            className="text-xl text-[#242426] cursor-pointer"
            onClick={onClose}
          />
        </nav>

        <div className="flex flex-col justify-center relative overflow-auto">
          <MessagePlayerContainer>
            <MessagesContext.Provider
              value={{
                add: insertMessage,
                update: updateMessage,
                messages: messageList,
                clear: clearMessages,
                load: replaceMessages,
              }}
            >
              <MessagePlayerComponent className="flex flex-row items-start justify-center pt-2" />
              {realtimeAgent.connected && (
                <ChatMessagesComponent
                  sending={realtimeAgent.sending}
                  onSend={(e) => realtimeAgent.send(e)}
                />
              )}
              {realtimeAgent.loading && (
                <div className="flex flex-col items-center justify-center">
                  <Loader />
                </div>
              )}
            </MessagesContext.Provider>
          </MessagePlayerContainer>
          {/* <div className="overflow-auto p-4 flex flex-col gap-4 rounded-t-2xl scrollbar-hide">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 p-[0.7rem] rounded-3xl items-end
                          ${msg.by === "OW" ? "bg-[#0050ff]" : "bg-[#e5e7eb]"}`}
              >
                <img
                  src={
                    msg.by === "MA"
                      ? "https://app.myaisells.com/assets/mayaframe.jpeg"
                      : "https://app.myaisells.com/assets/user.png"
                  }
                  className="w-6 h-6 object-cover rounded-full border-2 border-[#0050ff]"
                  alt={msg.by === "MA" ? "Maya" : "User"}
                />
                <p
                  className={`text-sm text-left
                              ${
                                msg.by === "OW"
                                  ? "text-white"
                                  : "text-[#242426]"
                              }`}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div> */}
        </div>

        {/* <div className="p-[0.75rem_1rem] flex items-center justify-center gap-4 h-fit mt-auto">
          <button onClick={() => setIsListening(!isListening)}>
            {isListening ? (
              <FaMicrophoneLines className="text-xl text-[#22c55e] animate-pulse" />
            ) : (
              <FaMicrophoneLinesSlash className="text-xl text-[#0050ff]" />
            )}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-[#e5e7eb] rounded-3xl py-2.5 px-4 outline-none 
                     text-sm text-[#2d2d2f]"
            placeholder="Aa"
          />
          <IoSend
            className="text-xl text-[#0050ff] cursor-pointer"
            onClick={() => {
              if (input.trim()) {
                sendMessage(input);
                setInput("");
              }
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ChatModal;
