import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return <div className="">Hello world</div>;
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render the app to");
}

const root = createRoot(container);
root.render(<App />);
