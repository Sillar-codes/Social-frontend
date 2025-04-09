import { toast } from "react-toastify";

export const handleError = (err: unknown, defaultMessage?: string) => {
  if (err instanceof Error) {
    toast(err.message, { type: "error" });
  } else {
    toast(defaultMessage || "An unknown error occured", { type: "error" });
  }
};
