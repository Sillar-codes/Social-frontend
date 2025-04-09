import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material";

import App from "./App.tsx";
import "./index.css";
import GlobalStateProvider from "@/context/GlobalStateProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </StyledEngineProvider>
  </StrictMode>
);
