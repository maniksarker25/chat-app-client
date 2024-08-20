import { useSocket } from "@/context/SocketContext";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

type TAvatarProps = {
  userId?: string;
  name?: string;
  imageUrl?: string;
  width?: number;
  height?: number;
};

const CostumeAvatar = ({
  userId,
  name,
  imageUrl,
  width,
  height,
}: TAvatarProps) => {
  console.log("userid from avatar", userId);
  // const onlineUser = useAppSelector((state) => state?.user?.onlineUser);
  // const { onlineUser } = useSocket();

  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
  ];

  const randomNumber = Math.floor(Math.random() * 9);

  // const isOnline = onlineUser.includes(userId);
  return (
    <div
      className={`text-slate-800  rounded-full font-bold relative`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          style={{ width: width + "px", height: height + "px" }}
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}
      {/* 
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 right-1 z-10 rounded-full"></div>
      )} */}
    </div>
  );
};

export default CostumeAvatar;
