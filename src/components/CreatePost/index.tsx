import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PostFormData } from "@/types/post";
import { createPost } from "@/services";
import { ROUTES } from "@/configs/routes";
import { handleError } from "@/utils";

export default function CreatePost() {
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (post: PostFormData) => {
    try {
      await createPost(post);
      toast("Created Post!", { type: "success" });
      navigate(ROUTES.FEED);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Stack
        direction="column"
        sx={{ width: { xs: "80%", md: "40%" }, mt: 5 }}
        spacing={2}
      >
        <Typography variant="h3" textAlign="center">
          Create Your Post
        </Typography>
        <Box component="hr" />
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Title"
              variant="filled"
              {...register("title")}
            ></TextField>
            {errors.title && (
              <Typography color="error">{errors.title.message}</Typography>
            )}
          </Stack>
          <Stack direction="column" spacing={2}>
            <TextField
              label="Content"
              variant="filled"
              multiline
              {...register("content")}
            ></TextField>
            {errors.content && (
              <Typography color="error">{errors.content.message}</Typography>
            )}
          </Stack>
          <Button aria-label="create-post" type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
