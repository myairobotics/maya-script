import { useContext, useEffect, useState } from "react";
import { useWebClient } from "../hooks/web-client.hook";
import MessagePlayerComponent from "./MessagePlayer";
import ChatMessagesComponent from "../containers/ChatMessages";
import { MayaAvatarContext } from "../contexts/avatar.context";
import Loader from "./Loader";

export default function WebChatContent({
  onLoad,
  open,
  bucketId,
  onAutomaticallyOpen,
  className,
}) {
  const plugin = useWebClient({ bucket_id: bucketId, onLoad });
  const [connected, setConnected] = useState(false);
  const { avatar } = useContext(MayaAvatarContext);
  useEffect(() => {
    if (plugin.connected) {
      plugin.alwaysOpen().then((always) => {
        if (always) {
          onAutomaticallyOpen();
        }
      });
    }
  }, [bucketId, plugin.connected]);

  useEffect(() => {
    if (!plugin.connected && open && !connected) {
      plugin
        .connect({
          sendGreeting: true,
        })
        .then((okay) => {
          setConnected(okay);
        });
    }
    if (!open && connected && plugin.connected) {
      plugin.controller?.cancel();
    }
  }, [open, connected, plugin.connected]);

  if (!plugin.connected) {
    return (
      <div className="flex flex-col justify-center w-full space-y-2 h-auto scale-75 origin-center">
        <img src={avatar.image} alt={avatar.name} />
        <div className="mx-auto">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MessagePlayerComponent
        className={"flex flex-col w-full justify-center space-y-2"}
      />
      <ChatMessagesComponent
        sending={plugin.busy}
        onCancel={() => {
          plugin.controller.client.cancel();
        }}
        onSend={(message) => plugin.controller.send(message)}
      />
    </div>
  );
}
