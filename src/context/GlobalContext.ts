import { createContext, ActionDispatch } from "react";

import { LoginAction } from "@/types/auth";
import { GlobalState } from "@/types";

interface ContextType {
  globalState: GlobalState;
  globalDispatch: ActionDispatch<[action: LoginAction]>;
}

const GlobalContext = createContext<ContextType | null>(null);

export default GlobalContext;
