import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function initializeMayaApp() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
}

if (process.env.NODE_ENV === "production") {
  window.MayaWidget = {
    initMayaWidget: initializeMayaApp,
  };
} else {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
}
export default { initMayaWidget: initializeMayaApp };
