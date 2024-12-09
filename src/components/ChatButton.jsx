import React, { useState, useEffect } from "react";

const ChatButton = ({ avatar, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setShowTooltip(false);
    onClick();
  };

  return (
    <div className="relative">
      {showTooltip && (
        <div
          className="fixed bottom-40 right-28 transform translate-x-1/2 
                     p-2 bg-black/10 border-[1.5px] border-white/30 
                     text-white text-sm rounded-md whitespace-nowrap 
                     z-[10000] backdrop-blur-sm "
          // style={{
          //   animation: "showHideTooltip 30s forwards",
          // }}
        >
          Click here to chat with Maya!!
        </div>
      )}
      <button
        onClick={handleClick}
        className="w-20 h-20 rounded-full bg-transparent flex items-center justify-center 
                   fixed bottom-16 right-16 cursor-pointer z-[10000] 
                   hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src={avatar}
          alt="Maya"
          className="w-full h-full object-cover rounded-full 
                     hover:filter hover:drop-shadow-lg"
        />
      </button>
    </div>
  );
};

export default ChatButton;
