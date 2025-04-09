import { RouterProvider } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

import GlobalContext from "@/context/GlobalContext";
import { currentUser } from "@/services";
import { User } from "@/types/auth";
import { ACTION_LOGIN, ACTION_LOGOUT } from "@/constants";
import Loading from "@/components/Loading";
import router from "@/routes";
import { handleError } from "./utils";

function App() {
  const context = useContext(GlobalContext);

  const getCurrentUser = useCallback(async () => {
    if (!context) return;
    const { globalDispatch } = context;
    try {
      const data = await currentUser();
      globalDispatch({ type: ACTION_LOGIN, payload: data as User });
    } catch (err) {
      handleError(err);
      globalDispatch({ type: ACTION_LOGOUT });
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!context) return <></>;
  const { globalState } = context;

  return (
    <Box sx={{ position: "relative" }}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} closeOnClick={true} />
      {globalState.isLoading ? <Loading /> : <></>}
    </Box>
  );
}

export default App;
