"use client";
import { useSocket } from "@/context/SocketContext";
import { setUser } from "@/redux/userSlice";
import { Box } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import backgroundImage from "../../../../public/wallapaper.jpeg";
import Link from "next/link";
import Avatar from "./Avatar";
import { uploadFile } from "@/helpers/uploadFile/uploadFile";
const ChatMessage = ({ userId }: { userId: string }) => {
  const { socket } = useSocket();
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload((preve) => !preve);
  };
  // handle upload image
  const handleUploadImage = async (e: any) => {
    const file = e.target.files[0];

    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);

    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url,
      };
    });
  };
  // console.log("user data", userData);
  useEffect(() => {
    if (socket && userId) {
      // console.log("run useEffect", userId);
      // Emit event to server
      socket.emit("message-page", userId);
      socket.on("message-user", (data) => {
        // console.log("user details", data);
        setUserData(data);
      });
    }
  }, [socket, userId]);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-no-repeat bg-cover "
    >
      <header className="sticky top-0 h-16 bg-white flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link href={"/chat"} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={userData?.profile_pic}
              name={userData?.name}
              userId={userData?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0 text-ellipsis line-clamp-1">
              {userData?.name}
            </h3>
            <p className="-my-2 text-sm">
              {userData.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      {/* show all messages */}
      <section className="h-[calc(100vh-128px)]  overflow-x-hidden overflow-y-scroll scrollbar">
        shwo all messages
      </section>
      {/* send message */}
      <section className="h-16 bg-white flex items-center">
        <button
          onClick={handleUploadImageVideoOpen}
          className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
        >
          <FaPlus size={20} />
        </button>

        {/**video and image */}
        {openImageVideoUpload && (
          <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2">
            <form>
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
              >
                <div className="text-primary">
                  <FaImage size={18} />
                </div>
                <p>Image</p>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
              >
                <div className="text-purple-500">
                  <FaVideo size={18} />
                </div>
                <p>Video</p>
              </label>

              <input
                type="file"
                id="uploadImage"
                // onChange={handleUploadImage}
                className="hidden"
              />

              <input
                type="file"
                id="uploadVideo"
                // onChange={handleUploadVideo}
                className="hidden"
              />
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ChatMessage;
