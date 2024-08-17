import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import chatImage from "../../../../public/chat.png";
const ChatPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#E1E7EF",
        width: "100%",
        height: "100%",
      }}
    >
      <Box>
        <Stack
          alignContent={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          justifyItems={"center"}
          sx={{ height: "100vh" }}
        >
          <Image src={chatImage} alt="chatImage" width={100} height={100} />
          <Typography sx={{ fontSize: "25px", fontWeight: 600 }}>
            Select user to send message
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatPage;
