import { useContext, useEffect, useRef, useState } from "react";
import { install } from "../plugin-loader";
import { PresentationContext } from "../contexts/presentation.context";
import { LoadingContext } from "../contexts/loading.context";
import { isString, noop } from "lodash";

const pluginVersion = process.env.REACT_APP_WEB_PLUGIN_VERSION || "1.0.12";

const pluginVersionSuffix = process.env.NODE_ENV === "production" ? "" : "-dev";

export function useWebClient({ bucket_id, business_tag, onLoad }) {
  const [status, setStatus] = useState({
    status: "pending",
    busy: false,
  });
  const clientRef = useRef({
    send: noop,
    connect: () => Promise.resolve(false),
    dispose: noop,
    alwaysOpen: () => Promise.resolve(false),
    isConnected: () => false,
    messages: noop,
  });
  const { setController, controller } = useContext(PresentationContext);

  const {
    changeMessage,
    onError,
    onLoad: onLoadingContextLoad,
  } = useContext(LoadingContext);

  useEffect(() => {
    setStatus({
      status: "loading",
      busy: true,
    });
    changeMessage("Loading artificial intelligence agent...");
    const subscriptions = [
      {
        unsubscribe: noop,
      },
    ];
    install({
      installationOptions: {
        bucket_id,
        business_tag,
      },
      path: `/scripts/web-agent-${pluginVersion}${pluginVersionSuffix}.js`,
      library: "MayaWebAgent",
      usesController: true,
    }).then(
      (result) => {
        setStatus({
          status: "loaded",
          busy: false,
        });
        setController(result.controller);
        clientRef.current = result.client;
        subscriptions.push(
          result.client.busy().subscribe({
            next: (busy) => {
              setStatus((prev) => ({ ...prev, busy }));
            },
          })
        );

        (onLoad || noop)();
        onLoadingContextLoad();
      },
      (err) => {
        if (isString(err)) {
          onError({ message: err });
        } else {
          onError({ message: "Loading artificial intelligence agent false" });
        }
        setStatus({
          status: "error",
          busy: false,
        });
      }
    );

    return () => {
      subscriptions.forEach((s) => {
        s.unsubscribe();
      });
      return clientRef.current.dispose();
    };
  }, [bucket_id, business_tag]);

  return {
    loading: status.status === "pending" || status.status === "loading",
    send: (message) => clientRef.current?.send(message),
    loaded: status.status === "loaded" || status.status === "connected",
    connect: async () => {
      const ok = await clientRef.current.connect();
      setStatus((prev) => ({
        ...prev,
        status: ok ? "connected" : prev.status,
      }));
    },
    connected: status.status === "connected",
    alwaysOpen: () => clientRef.current.alwaysOpen(),
    messages: () => clientRef.current.messages(),
    controller,
    busy: status.busy,
  };
}
