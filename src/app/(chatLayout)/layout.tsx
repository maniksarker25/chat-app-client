"use client";
import LeftSidebar from "@/components/Chat/LeftSidebar";
import { Box, Stack } from "@mui/material";
import { usePathname } from "next/navigation";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const basePath = pathName === "/chat";
  console.log(basePath);
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
