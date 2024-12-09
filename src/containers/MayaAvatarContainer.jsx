import { useState } from "react";
import { MayaAvatarContext } from "../contexts/avatar.context";

export const MayaAvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState({ name: null, image: null });

  return (
    <MayaAvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </MayaAvatarContext.Provider>
  );
};
