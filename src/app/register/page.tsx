"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import chatAnimation from "../../../public/Animation - 1721283652797.json";
import CForm from "@/components/Forms/CForm";
import CInput from "@/components/Forms/CInput";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { registerUser } from "@/services/actions/registerUser";
import { toast } from "sonner";
import { loginUser } from "@/services/actions/loginUser";
import { authKey } from "@/constants/auth";
import setAccessTokenToCookies from "@/services/actions/setAccessTokenToCookies";

const RegisterPage = () => {
  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await registerUser(values);
      if (res?.success) {
        const result = await loginUser({
          email: values.email,
          password: values.password,
        });
        if (result?.success) {
          toast.success("User login successfully");
          localStorage.setItem(authKey, result?.data?.accessToken);
          setAccessTokenToCookies(result?.data?.token, {
            redirect: "/",
          });
        } else {
          toast.error("User login failed");
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
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
          <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
            <Box sx={{ width: "45%" }}>
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
              <Stack sx={{ mt: "20px" }}>
                <CForm onSubmit={handleRegister}>
                  <Grid container spacing={3} mb={1}>
                    <Grid item xs={12}>
                      <CInput
                        name="name"
                        type="text"
                        label="Enter Name"
                        fullWidth={true}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CInput
                        name="email"
                        type="email"
                        label="Enter Email"
                        fullWidth={true}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CInput
                        name="password"
                        type="password"
                        label="Enter Password"
                        fullWidth={true}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth={true}
                    sx={{
                      margin: "20px 0px",
                    }}
                    type="submit"
                  >
                    Register
                  </Button>
                  <Typography component="p" fontWeight={300}>
                    Already have an account?
                    <Link style={{ color: "#1586FD" }} href={"/login"}>
                      Login
                    </Link>
                  </Typography>
                </CForm>
              </Stack>
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
