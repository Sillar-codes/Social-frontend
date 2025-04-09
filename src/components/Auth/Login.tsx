import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthFormData, User } from "@/types/auth";
import { loginUser } from "@/services";
import GlobalContext from "@/context/GlobalContext";
import { ACTION_LOADING, ACTION_LOGIN } from "@/constants";
import CustomLink from "@/components/CustomLink";
import { ROUTES } from "@/configs/routes";
import { handleError } from "@/utils";

interface LoginResponseProps {
  token: string;
  user: User;
}

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email is invalid")
      .required("Email is required")
      .matches(
        /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
      ),
    password: yup.string().required("Password is required").default(""),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (context && context.globalState.currentUser) navigate(ROUTES.PROFILE);
  }, []);

  const onSubmit = async (formData: AuthFormData) => {
    context?.globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", (data as LoginResponseProps).token);
      const loggedUser = (data as LoginResponseProps).user as User;
      context?.globalDispatch({
        type: ACTION_LOGIN,
        payload: loggedUser,
      });
      toast(`Welcome ${loggedUser.name}`, { type: "success" });
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
    context?.globalDispatch({ type: ACTION_LOADING, payload: false });
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h2" textAlign="center">
            Sign In
          </Typography>
          <hr />
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
          <Stack direction="column" spacing={1}>
            <TextField
              aria-label="email"
              label="Password"
              variant="filled"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
          </Stack>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
        <Button type="submit" variant="contained" color="success">
          <Box component={CustomLink} to="/register" width="100%">
            Register
          </Box>
        </Button>
      </Stack>
    </Stack>
  );
}
