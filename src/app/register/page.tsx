"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import chatAnimation from "../../../public/Animation - 1721283652797.json";

const RegisterPage = () => {
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 6,
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="h6"
                component={"p"}
                fontSize={"40px"}
                fontWeight={400}
                style={{ marginBottom: "0px" }}
              >
                Hello,
              </Typography>
              <Typography
                variant="h3"
                component={"h2"}
                fontWeight={600}
                style={{ marginTop: "-10px" }}
                color={"primary"}
              >
                Welcome!
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Lottie animationData={chatAnimation} loop={true}></Lottie>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
