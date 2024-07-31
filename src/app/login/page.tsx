"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import chatAnimation from "../../../public/Animation - 1721283652797.json";
import { FieldValues } from "react-hook-form";
import CForm from "@/components/Forms/CForm";
import CInput from "@/components/Forms/CInput";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/services/actions/loginUser";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/authServices";
import setAccessTokenToCookies from "@/services/actions/setAccessTokenToCookies";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleLogin = async (values: FieldValues) => {
    setError("");
    try {
      const res = await loginUser(values);
      if (res?.success) {
        storeUserInfo(res?.data?.accessToken);
        setAccessTokenToCookies(res?.data?.accessToken, {
          redirect: "/",
        });
        toast.success("User login successfully");

        router.push("/");
      } else {
        setError(res?.message);
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
                <CForm onSubmit={handleLogin}>
                  <Grid container spacing={3} mb={1}>
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
                  {error && (
                    <Box>
                      <Typography color={"red"}>{error}</Typography>
                    </Box>
                  )}
                  <Button
                    fullWidth={true}
                    sx={{
                      margin: "20px 0px",
                    }}
                    type="submit"
                  >
                    Login
                  </Button>
                  <Typography component="p" fontWeight={300}>
                    Don&apos;t have an account?
                    <Link style={{ color: "#1586FD" }} href={"/register"}>
                      Create an account
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

export default LoginPage;
