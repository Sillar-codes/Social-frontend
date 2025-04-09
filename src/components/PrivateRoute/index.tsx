import { ReactElement, useContext } from "react";
import { Navigate } from "react-router-dom";

import GlobalContext from "@/context/GlobalContext";
import { ROUTES } from "@/configs/routes";

interface Props {
  element: ReactElement;
}

export default function PrivateRoute({ element }: Props) {
  const context = useContext(GlobalContext);
  console.log(context?.globalState);

  return (
    <>
      {!context ? (
        <></>
      ) : context.globalState.currentUser ? (
        element
      ) : (
        <Navigate to={ROUTES.LOGIN} />
      )}
    </>
  );
}
