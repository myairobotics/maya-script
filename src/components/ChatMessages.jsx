import { useContext, useEffect, useRef } from "react";
import { MessagesContext } from "../contexts/messages.context";
import AiChat from "./AiChat";
import UserChat from "./UserChat";
import UserResponseComponent from "./UserResponse";
import { MayaAvatarContext } from "../contexts/avatar.context";

function MessageRenderer({ message }) {
  console.log("rendering messages renderr");
  const avatar = useContext(MayaAvatarContext);

  if (message.type !== "message" || message.silent) {
    return null;
  }

  if (message.by.toLowerCase() === "user") {
    return <UserChat text={message.text} />;
  }
  return <AiChat text={message.text} img={avatar?.image} />;
}

export default function ChatMessagesComponent({ onSend, sending }) {
  const messagesContainerRef = useRef(null);
  const { messages } = useContext(MessagesContext);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const h = messagesContainerRef.current.scrollHeight;
      messagesContainerRef.current.scrollTop = h;
    }
  }, [messages.length]); // The message list may not change because I am simulating state change with a ref. Therefore, the length is used as a dependency

  return (
    <>
      <div
        ref={messagesContainerRef}
        className="overflow-y-auto w-full overflow-x-clip"
      >
        {messages.map((message) => (
          <MessageRenderer key={message.id} message={message} />
        ))}
      </div>
      <UserResponseComponent
        sending={sending}
        onSend={(e) => {
          onSend({
            text: e.content,
            by: e.by,
          });
        }}
      />
    </>
  );
}
