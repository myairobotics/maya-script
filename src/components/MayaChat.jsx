import React, { useContext, useEffect, useState } from "react";
import ChatButton from "./ChatButton";
import ChatModal from "./ChatModal";
import { useChat } from "../hooks/useChat";
import { MayaAvatarContext } from "../contexts/avatar.context";
import WebChatFrame from "./Frame";
import { IoClose } from "react-icons/io5";

const MayaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bucketId, setBucketId] = useState(0);
  const { messages, sendMessage } = useChat();
  const { avatar, setAvatar } = useContext(MayaAvatarContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data?.bucket) {
      console.log(data.bucket, "bucket Id");
      setBucketId(data.bucket);
      fetchAvatar(data.bucket);
    }
  }, []);

  const fetchAvatar = async (bucketId) => {
    try {
      const response = await fetch(
        `https://maya-node-ai-sales-backend.onrender.com/a/buckets/${bucketId}/avatar`
      );
      const data = await response.json();
      console.log(data);
      console.log(avatar);
      setAvatar({ ...avatar, name: data.name, image: data.image });
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  return (
    <div className="maya-widget-container">
      {!isOpen && (
        <ChatButton avatar={avatar.image} onClick={() => setIsOpen(true)} />
      )}
      {
        <>
          <div
            className={`${
              isOpen ? "fixed bottom-4 right-4 z-[10000]" : "hidden"
            } `}
          >
            <div
              className="h-fit w-[400px] flex flex-col absolute bottom-4 right-4 
           bg-transparent overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-[0.45rem_0.8rem] flex items-center justify-center rounded-[15px] h-fit">
                <div className="flex items-center px-4 gap-[0.45rem]">
                  <img
                    src={avatar.image}
                    alt="Maya"
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <div className="flex items-center text-[#242426] text-[0.8rem] font-semibold font-['Rubik']">
                    MyAI
                  </div>
                </div>
                <IoClose
                  className="text-xl text-[#242426] cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </nav>
              <div className="flex flex-col justify-center relative overflow-auto">
                <WebChatFrame
                  open={isOpen}
                  onAutomaticallyOpen={() => setIsOpen(true)}
                  bucketId={bucketId}
                  className=""
                  onClose={() => setIsOpen(false)}
                  onLoad={() => setLoaded(true)}
                />
              </div>
            </div>
          </div>
        </>
        // <ChatModal
        //   onClose={() => setIsOpen(false)}
        //   bucketId={bucketId}
        //   messages={messages}
        //   sendMessage={sendMessage}
        // />
      }
    </div>
  );
};

export default MayaChat;
