import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ marginTop: "100px" }}>
        <Outlet />
      </Container>
    </>
  );
}
