import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Graphite: --openui-* tokens (light/dark), Inter, type classes and component CSS.
import "../../../dist/graphite.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
