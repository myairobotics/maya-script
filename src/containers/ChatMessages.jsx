import { useContext, useEffect, useRef } from "react";
import { MessagesContext } from "../contexts/messages.context";
import AiChat from "../components/AiChat";
import UserChat from "../components/UserChat";
import UserResponseComponent from "../components/UserResponse";
import { MayaAvatarContext } from "../contexts/avatar.context";

function MessageRenderer({ message }) {
  console.log("message sent", message);
  const avatar = useContext(MayaAvatarContext);

  if (message.type !== "message" || message.silent) {
    return null;
  }

  if (message.by.toLowerCase() === "user") {
    return <UserChat text={message.text} />;
  }
  return <AiChat text={message.text} img={avatar?.image} />;
}

export default function ChatMessagesComponent({ onSend, sending, onCancel }) {
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
        className="overflow-y-auto max-h-32 w-full gap-y-1 overflow-x-clip"
      >
        {messages.map((message) => (
          <MessageRenderer key={message.id} message={message} />
        ))}
      </div>
      <UserResponseComponent
        onCancel={onCancel}
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
