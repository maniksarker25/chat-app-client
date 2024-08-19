"use client";
import LeftSidebar from "@/components/UI/Chat/LeftSidebar";
import { authKey } from "@/constants/auth";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import { Box, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import io from "socket.io-client";
const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  // const user = useAppSelector((state) => state.user);
  // console.log("user", user);
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const basePath = pathName === "/chat";
  // const { data, refetch, isLoading } = useGetMyProfileQuery(undefined);
  // if (!isLoading) {
  //   dispatch(setUser(data?.data && data?.data));
  // }

  // useEffect(() => {
  //   refetch();
  // });
  // socket connection
  // useEffect(() => {
  //   const socketConnection = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
  //     auth: {
  //       token: localStorage.getItem(authKey),
  //     },
  //   });

  //   socketConnection.on("onlineUser", (data) => {
  //     // console.log(data);
  //     dispatch(setOnlineUser(data));
  //   });

  //   // set socket connection to redux
  //   dispatch(setSocketConnection(socketConnection));
  //   return () => {
  //     socketConnection.disconnect();
  //   };
  // }, []);
  return (
    <Box>
      <Stack
        direction={"row"}
        sx={{
          height: "screen",
          maxHeight: "screen",
        }}
      >
        {" "}
        <Box
          sx={{
            width: { xs: "100%", lg: "400px" },
            display: { xs: `${!basePath && "none"}`, lg: "block" },
          }}
        >
          <LeftSidebar />
        </Box>
        <Box
          sx={{
            display: { xs: `${basePath && "none"}`, lg: "block" },
            width: "100%",
            height: "100vh",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatLayout;
