import React from "react";

const UserChat = ({ text }) => {
  if (!text) {
    return <span></span>;
  }
  return (
    <div className="flex mb-2 gap-3 p-[0.7rem] rounded-3xl items-end bg-[#0050ff]">
      <img
        src="https://app.myaisells.com/assets/user.png"
        alt="user iMG"
        className="w-6 h-6 object-cover rounded-full border-2 border-[#0050ff]"
      />
      <p className="text-sm text-left text-white">{text}</p>
    </div>
  );
};

export default UserChat;
