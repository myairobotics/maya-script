import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

function initializeMayaApp(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    ReactDOM.render(<App />, container);
  } else {
    console.error(`Container with id ${containerId} not found.`);
  }
}
if (process.env.NODE_ENV === "prod") {
  window.MayaWidget = {
    initialize: initializeMayaApp,
  };
} else {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  }
}
