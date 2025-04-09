import { ReactNode, useReducer } from "react";

import { LoginAction, User } from "@/types/auth";
import { ACTION_LOADING, ACTION_LOGIN, ACTION_LOGOUT } from "@/constants";
import GlobalContext from "@/context/GlobalContext";
import { GlobalState } from "@/types";

function reducer(prevState: GlobalState, action: LoginAction) {
  let newState;
  switch (action.type) {
    case ACTION_LOGIN:
      newState = { ...prevState, currentUser: action.payload as User };
      return newState;
    case ACTION_LOGOUT:
      localStorage.removeItem("token");
      newState = { ...prevState, currentUser: null };
      return newState;
    case ACTION_LOADING:
      newState = { ...prevState, isLoading: action.payload as boolean };
      return newState;
    default:
      return prevState;
  }
}

interface Props {
  children: ReactNode;
}

export default function GlobalStateProvider({ children }: Props) {
  const [globalState, globalDispatch] = useReducer(reducer, {
    currentUser: null,
    isLoading: false,
  });

  return (
    <GlobalContext.Provider
      value={{ globalState: globalState, globalDispatch: globalDispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
