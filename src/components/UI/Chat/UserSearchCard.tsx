import React from "react";
import Link from "next/link";
import CostumeAvatar from "./CostumeAvatar";

const UserSearchCard = ({ user, setOpen }: any) => {
  return (
    <Link
      href={`/chat/${user?._id}`}
      onClick={() => setOpen(false)}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
    >
      <div>
        <div>
          <CostumeAvatar
            width={50}
            height={50}
            name={user?.name}
            userId={user?._id}
            imageUrl={user?.profile_pic}
          />
        </div>
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
