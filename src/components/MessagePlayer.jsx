import { useContext, useRef, useEffect, useState } from "react";
import { MessagePlayerContext } from "../contexts/video-orchestration";
import { MayaAvatarContext } from "../contexts/avatar.context";
import { FeedbackContext } from "../contexts/feedback.context";
import { wrap } from "lodash";
import { PresentationContext } from "../contexts/presentation.context";
import { TbDeviceComputerCameraOff } from "react-icons/tb";
import { useRealtimeResponsesRenderer } from "../hooks/responses-renderer.hook";

export default function MessagePlayerComponent({ className }) {
  const { avatar } = useContext(MayaAvatarContext);

  const { present, renderOn } = useRealtimeResponsesRenderer();

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      renderOn(containerRef.current);
    }
  }, [containerRef.current]);

  return (
    <div
      ref={containerRef}
      className={`h-auto scale-75 origin-center ${className}`}
    >
      {avatar && (
        <img
          className={`${present ? " hidden" : ""}`}
          src={avatar.image}
          alt={`${avatar.name} Avatar`}
        />
      )}
    </div>
  );
}
