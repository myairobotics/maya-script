import { useState, useRef, useMemo } from "react";
import { MessagesContext } from "../contexts/messages.context";

export default function MessagesContainer({ children }) {
  const [messagesVersion, setMessagesVersion] = useState(0);
  // For a reason I can't explain, using useState to manage a list of messages seems not to work. The original list is lost after two sets
  // I want to fake it's re-render with a ref and memo
  const messagesRef = useRef([]);

  const messageList = useMemo(() => messagesRef.current, [messagesVersion]);

  const remove = ({ id }) => {
    const index = messagesRef.current.findIndex((m) => m.id === id);
    if (index >= 0) {
      messagesRef.current.splice(index, 1);
      setMessagesVersion(messagesVersion + (1 % 4));
    }
  };

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

  return (
    <MessagesContext.Provider
      value={{
        add: insertMessage,
        update: updateMessage,
        messages: messageList,
        clear: clearMessages,
        load: replaceMessages,
        remove,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
