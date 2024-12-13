import React, { useState, useEffect } from "react";

const ChatButton = ({ avatar, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const showDelay = setTimeout(() => {
      setShowTooltip(true);
      setIsAnimating(true);
    }, 500);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => {
      clearTimeout(showDelay);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClick = () => {
    setShowTooltip(false);
    onClick();
  };

  return (
    <div className="relative">
      {showTooltip && (
        <div className="fixed bottom-40 max-w-sm right-14 z-[10000]">
          <div
            className={`
              relative p-6
              bg-white/30
              backdrop-blur-md backdrop-saturate-150
              border border-white/20
              text-white
              rounded-2xl
              transform
              transition-all duration-700 ease-in-out
              ${
                isAnimating
                  ? "animate-bounce_gentle scale-100 opacity-100"
                  : "scale-95 opacity-0"
              }
              before:content-['']
              before:absolute
              before:bottom-[-10px]
              before:right-[40px]
              before:w-5
              before:h-5
              before:bg-transparent
              before:backdrop-blur-md
              before:backdrop-saturate-150
              before:rotate-45
              before:border-r
              before:border-b
              before:border-white/20
              shadow-xl
              shadow-blue-500/20
            `}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            <div className="space-y-2">
              <p className="font-semibold text-lg mix-blend-difference text-black">
                Hey, I am Maya! 👋
              </p>
              <p className="text-sm  text-black/90 mix-blend-difference leading-relaxed font-medium">
                Welcome to the site! Would you like me to guide you through?
                Click on my icon below to start chatting!
              </p>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleClick}
        className={`
          w-20 h-20 rounded-full
          fixed bottom-16 right-16
          cursor-pointer z-[10000]
          transition-all duration-500
          hover:scale-105
          hover:shadow-lg hover:shadow-purple-500/30
        `}
      >
        <img
          src={avatar}
          alt="Maya"
          className="w-full h-full object-cover rounded-full"
        />
      </button>
    </div>
  );
};

export default ChatButton;
