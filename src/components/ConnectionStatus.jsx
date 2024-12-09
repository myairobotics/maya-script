import { useContext, useEffect, useState } from "react";
import { PresentationContext } from "../contexts/presentation.context";

export default function RealtimeConnectionStatusComponent({ className }) {
  const { controller } = useContext(PresentationContext);
  const [status, setStatus] = useState({
    value: "pending",
    hidden: true,
  });

  useEffect(() => {
    let subscription = null;
    if (controller && controller.client) {
      subscription = controller.client.connectionChanged().subscribe({
        next: (item) => {
          setStatus({
            value: item.status,
            hidden: false,
          });
          setTimeout(() => {
            setStatus((prev) => ({
              value: prev.value,
              hidden: true,
            }));
          }, 3000);
        },
      });
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [controller?.client]);
  if (status.hidden) {
    return null;
  }
  switch (status.value) {
    case "connecting":
      return <span className={className}>Connecting&hellip;</span>;
    case "reconnecting":
      return <span className={className}>Re-connecting&hellip;</span>;
    case "connected":
      return <span className={`${className} text-green-800`}>Connected</span>;
    case "disconnected":
      return <span className={`${className} text-red-800`}>Disconnected</span>;
    default:
      return null;
  }
}
