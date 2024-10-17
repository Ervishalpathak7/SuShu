import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Main from "./App"; // Import the Main component

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main /> 
  </StrictMode>
);
