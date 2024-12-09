import { truncate } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { MayaAvatarContext } from "../contexts/avatar.context";

const maxChars = 100;

const AiChat = ({ text, aiResp = false, img }) => {
  const [truncateSize, setTruncateSize] = useState(maxChars);
  const { avatar } = useContext(MayaAvatarContext);

  const displayText = useMemo(() => {
    if (!text) {
      return "";
    }
    return truncate(text, { length: truncateSize });
  }, [truncateSize, text]);

  const hasMore = useMemo(() => {
    if (!text) {
      return false;
    }
    return text.length > truncateSize;
  }, [text, truncateSize]);

  const showMore = (e) => {
    e.preventDefault();
    setTruncateSize(truncateSize + maxChars);
  };

  const hideMore = (e) => {
    e.preventDefault();
    if (truncateSize > maxChars) {
      setTruncateSize(maxChars);
    }
  };

  if (!text) {
    return <span></span>;
  }
  return (
    <div className="flex justify-center w-full items-start py-2 sm:py-3 px-2 border border-[#E2E8F0] bg-[#e5e7eb] rounded-2xl shadow-md space-x-2 me-2.5 mb-2">
      <img
        src={avatar.image}
        alt="agent"
        className="w-6 h-6 object-cover rounded-full border-2 border-[#0050ff]"
      />
      <div className="flex-1 relative flex justify-between items-center my-auto">
        <div className="text-start font-rubik">
          <div className={`info-container text-[#242426] text-sm font-normal`}>
            {displayText}
            {truncateSize > maxChars && !hasMore && (
              <a href="#" className="ml-2" onClick={hideMore}>
                Hide
              </a>
            )}
            {hasMore && (
              <a href="#" className="ml-2" onClick={showMore}>
                More
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
