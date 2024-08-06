import { Avatar, Box, Stack } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
const LeftSidebar = () => {
  return (
    <Stack direction={"row"}>
      <Box
        sx={{
          width: "60px",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            backgroundColor: "#f1f5f9",
            height: "100vh",
            py: "50px",
          }}
        >
          <Stack>
            <ChatIcon
              sx={{
                fontSize: "30px",
                color: "#374151",
                cursor: "pointer",
              }}
            />
            <PersonAddAlt1Icon
              sx={{
                mt: "15px",
                fontSize: "30px",
                color: "#374151",
                cursor: "pointer",
              }}
            />
          </Stack>
          <Stack direction={"column"} alignItems={"center"}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{
                cursor: "pointer",
              }}
            />
            <LogoutIcon
              sx={{
                fontSize: "30px",
                color: "#374151",
                mt: "25px",
                cursor: "pointer",
              }}
            />
          </Stack>
        </Stack>
      </Box>
      <Box>second</Box>
    </Stack>
  );
};

export default LeftSidebar;
