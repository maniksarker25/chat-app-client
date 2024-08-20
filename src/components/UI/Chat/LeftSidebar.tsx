import { Avatar, Box, Stack, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LogoutIcon from "@mui/icons-material/Logout";
import EditProfileModal from "./EditProfileModal";
import { useEffect, useState } from "react";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import SearchUserModal from "./SearchUserModal";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/actions/logoutUser";
import { useSocket } from "@/context/SocketContext";
import Link from "next/link";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import CostumeAvatar from "./CostumeAvatar";
type TConversationUser = {
  sender: Sender;
  receiver: Receiver;
  unseenMsg: number;
  userDetails: UserDetails;
  _id: string;
  lastMsg: LastMsg;
};
type LastMsg = {
  _id: string;
  text: string;
  imageUrl: string;
  videoUrl: string;
  seen: boolean;
  msgByUserId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type Receiver = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type Sender = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type UserDetails = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile_pic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const LeftSidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const { data } = useGetMyProfileQuery(undefined);
  const pathname = usePathname();
  const user = data?.data;
  const { socket } = useSocket();
  const [allUser, setAllUser] = useState<TConversationUser[]>([]);
  console.log("all users", allUser);
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    router.push("/login");
  };

  useEffect(() => {
    if (socket) {
      socket.emit("sidebar", user?._id);
      socket.on("conversation", (data) => {
        // console.log("conversation", data);
        const conversationUserData = data.map(
          (conversationUser: any, index: number) => {
            if (
              conversationUser?.sender?._id === conversationUser?.receiver?._id
            ) {
              return {
                ...conversationUser,
                userDetails: conversationUser?.sender,
              };
            } else if (conversationUser?.receiver?._id !== user?._id) {
              return {
                ...conversationUser,
                userDetails: conversationUser.receiver,
              };
            } else {
              return {
                ...conversationUser,
                userDetails: conversationUser.sender,
              };
            }
          }
        );

        setAllUser(conversationUserData);
      });
    }
  }, [socket, user]);

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
              onClick={handleLogout}
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
        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
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
          {allUser.map((conv, index) => {
            const isActive = pathname === `/${conv?.userDetails?._id}`;
            const href =
              pathname === "/chat"
                ? `chat/${conv?.userDetails?._id}`
                : `${conv?.userDetails?._id}`;

            return (
              <Link
                href={href}
                key={conv?._id}
                className={`flex items-center gap-2 py-3 px-2 border border-transparent rounded hover:bg-slate-100 cursor-pointer
                ${
                  isActive
                    ? "border-primary bg-slate-100"
                    : "hover:border-primary"
                }`}
              >
                <div>
                  <CostumeAvatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className="text-ellipsis line-clamp-1">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                    {conv?.unseenMsg}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </Box>
    </Stack>
  );
};

export default LeftSidebar;
