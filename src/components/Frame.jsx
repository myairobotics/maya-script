import FeedbackContainer from "../containers/FeedbackContainer";
import PresentationControllerProvider from "../containers/PresentationControllerProvider";
import MessagePlayerContainer from "../containers/MessagePlayerContainer";
import MessagesContainer from "../containers/MessagesContainer";
import { useContext, useEffect, useState } from "react";
import { MayaAvatarContext } from "../contexts/avatar.context";
import WebChatContent from "./Content";

export default function WebChatFrame({
  open,
  bucketId,
  onAutomaticallyOpen,
  onLoad,
  className,
  onClose,
}) {
  const { avatar } = useContext(MayaAvatarContext);
  console.log("avatar from frame parent of webcontent", avatar);

  if (!avatar) {
    console.log("No avatar");
    return null;
  }

  return (
    <div className={`${open ? "" : "hidden "}${className}`}>
      {/* <MayaAvatarContext.Provider value={avatar}> */}
      <PresentationControllerProvider>
        <MessagePlayerContainer>
          <MessagesContainer>
            <FeedbackContainer>
              <WebChatContent
                open={open}
                bucketId={bucketId}
                onAutomaticallyOpen={onAutomaticallyOpen}
                onLoad={onLoad}
              />
            </FeedbackContainer>
          </MessagesContainer>
        </MessagePlayerContainer>
      </PresentationControllerProvider>
      {/* </MayaAvatarContext.Provider> */}
    </div>
  );
}
