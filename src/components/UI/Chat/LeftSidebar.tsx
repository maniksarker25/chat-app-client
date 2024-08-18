import { Avatar, Box, Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import SearchUserModal from "./SearchUserModal";
const LeftSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const { data } = useGetMyProfileQuery(undefined);
  const [allUser, setAllUser] = useState([]);
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
              onClick={() => setIsSearchModalOpen(true)}
              sx={{
                mt: "15px",
                fontSize: "30px",
                color: "#374151",
                cursor: "pointer",
              }}
            />
            <SearchUserModal
              open={isSearchModalOpen}
              setOpen={setIsSearchModalOpen}
            />
          </Stack>
          <Stack direction={"column"} alignItems={"center"}>
            <Avatar
              onClick={() => setIsModalOpen(true)}
              alt={data?.data?.name}
              src={data?.data?.profile_pic}
              sx={{
                cursor: "pointer",
              }}
            />
            <EditProfileModal open={isModalOpen} setOpen={setIsModalOpen} />
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
      <Box>
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        {allUser?.length === 0 && (
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ mt: "80px" }}
          >
            <svg
              style={{ stroke: "gray" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
              />
            </svg>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                textAlign: "center",
                color: "gray",
              }}
            >
              Explore users to start a conversation with
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default LeftSidebar;
