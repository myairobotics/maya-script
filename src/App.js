import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExamplePage from "./pages/ExamplePage";
import MayaChat from "./components/MayaChat";
import { MayaAvatarProvider } from "./containers/MayaAvatarContainer";

function App() {
  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify({ bucket: "24" }));
  }, []);

  return (
    <MayaAvatarProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/example" element={<ExamplePage />} /> */}
        </Routes>
        <MayaChat />
      </Router>
    </MayaAvatarProvider>
  );
}

export default App;
