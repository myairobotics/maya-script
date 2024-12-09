import { useRef, useState } from "react";
import { PresentationContext } from "../contexts/presentation.context";

export default function PresentationControllerProvider({ children }) {
  const controllerRef = useRef(null);
  const [version, setVersion] = useState(0);
  // The version is just to trigger re-render op
  const setter = (controller) => {
    controllerRef.current = controller;
    setVersion(version + 1);
  };

  return (
    <PresentationContext.Provider
      value={{
        controller: controllerRef.current,
        loaded: version > 0,
        setController: setter,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}
