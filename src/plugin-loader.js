function loadPluginScript({ backendUrl, path, library }) {
  if (library in window) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.defer = true;
    s.src = `${backendUrl}${path.replace(/\.js$/, "")}.js`;
    s.onload = resolve;
    s.onerror = () => {
      reject("Failed to load realtime client plugin: " + s.src);
    };
    document.body.appendChild(s);
  });
}

async function installClient({
  installationOptions,
  library,
  path,
  usesController,
}) {
  await loadPluginScript({
    backendUrl: process.env.REACT_APP_BACKEND_NEW_URL,
    library,
    path,
  });

  const client = await window[library].install({
    ...installationOptions,
    base_url: process.env.REACT_APP_BACKEND_NEW_URL,
    access_token: process.env.REACT_APP_IMAGE_UPLOAD_KEY,
    logging: process.env.REACT_APP_NODE_ENV !== "production",
  });

  if (usesController) {
    return { client, controller: window[library].createController(client) };
  }
  return { client };
}

export function install({
  library,
  path,
  installationOptions,
  usesController,
}) {
  return installClient({ installationOptions, library, path, usesController });
}
