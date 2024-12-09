import { useState } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [chat_id, setChatId] = useState(null);

  const sendMessage = async (message) => {
    const bucketId = JSON.parse(localStorage.getItem("data"))?.bucket;
    const token2 = "mLF8*$4LwRfEzDYyDi!_0w";
    const url = "https://maya-node-ai-sales-backend.onrender.com/api/v2";

    try {
      // Add user message immediately
      setMessages((prev) => [...prev, { by: "OW", message }]);

      const response = await fetch(
        `${url}/ai/buckets/${bucketId}/web/conversations`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token2}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input: message,
            chat_id: chat_id || 0,
            include_media: true,
          }),
        }
      );

      const data = await response.json();
      setChatId(data.chat_id);

      // Add Maya's response
      setMessages((prev) => [...prev, { by: "MA", message: data.content }]);

      return data;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return { messages, sendMessage, chat_id };
};
