import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField, Typography } from "@mui/material";

import { AuthFormData, User } from "@/types/auth";
import { registerUser, updateUser } from "@/services";
import GlobalContext from "@/context/GlobalContext";
import { ACTION_LOADING, ACTION_LOGIN } from "@/constants";
import { ROUTES } from "@/configs/routes";
import { handleError } from "@/utils";

interface Props {
  isUpdating?: boolean;
}

export default function Register({ isUpdating }: Props) {
  const schema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
      ),
    prevPassword: isUpdating
      ? yup.string().required("Previous Password is required")
      : yup.string().optional(),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      prevPassword: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  // useEffect(() => {
  //   if (!context) return;
  // }, []);

  if (context && context.globalState.currentUser && !isUpdating) {
    navigate(ROUTES.PROFILE);
  }

  const handleRegisterSubmit = async (formData: AuthFormData) => {
    context?.globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      await registerUser(formData);
      toast("Registered successfully.", { type: "success" });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      handleError(err);
    }
    context?.globalDispatch({ type: ACTION_LOADING, payload: false });
  };

  const handleUpdateSubmit = async (formData: AuthFormData) => {
    try {
      const data = await updateUser(formData);
      context?.globalDispatch({
        type: ACTION_LOGIN,
        payload: data as User,
      });
      navigate(ROUTES.PROFILE);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Stack
        direction="column"
        spacing={1}
        marginTop={5}
        sx={{ width: { xs: "90%", md: "40%" } }}
      >
        <Stack
          component="form"
          direction="column"
          spacing={2}
          onSubmit={handleSubmit(
            isUpdating ? handleUpdateSubmit : handleRegisterSubmit
          )}
        >
          <Typography variant="h2" textAlign="center">
            {isUpdating ? "Update User" : "Sign Up"}
          </Typography>
          <hr />
          <Stack direction="column" spacing={1}>
            <TextField
              aria-label="name"
              label="Name"
              type="text"
              variant="filled"
              {...register("name")}
            />
            {errors.name && (
              <Typography color="error">{errors.name.message}</Typography>
            )}
          </Stack>
          {isUpdating ? (
            <></>
          ) : (
            <Stack direction="column" spacing={1}>
              <TextField
                aria-label="email"
                label="Email"
                type="text"
                variant="filled"
                {...register("email")}
              />
              {errors.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )}
            </Stack>
          )}
          {isUpdating ? (
            <Stack direction="column" spacing={1}>
              <TextField
                aria-label="prev-password"
                label="Previous Password"
                variant="filled"
                type="password"
                {...register("prevPassword")}
              />
              {errors.prevPassword && (
                <Typography color="error">
                  {errors.prevPassword.message}
                </Typography>
              )}
            </Stack>
          ) : (
            <></>
          )}
          <Stack direction="column" spacing={1}>
            <TextField
              aria-label="password"
              label="Password"
              variant="filled"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
          </Stack>
          <Stack direction="column" spacing={1}>
            <TextField
              aria-label="confirmPassword"
              label="Confirm Password"
              variant="filled"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <Typography color="error">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </Stack>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
