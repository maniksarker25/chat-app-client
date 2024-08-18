import MSModal from "@/components/Shared/MSModal/MSModal";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { useDebounce } from "@/redux/hooks";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import UserSearchCard from "./UserSearchCard";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchUserModal = ({ open, setOpen }: TProps) => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllUserQuery({ ...query });
  const searchUser = data?.data;
  return (
    <MSModal open={open} setOpen={setOpen} title="Search User">
      <Box sx={{ minWidth: "400px", minHeight: "200px" }}>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          label="Search user by name,email.."
          fullWidth
        />
        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/**no user found */}
          {searchUser?.length === 0 && !isLoading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          {isLoading && <p>loading..</p>}

          {searchUser?.length !== 0 &&
            !isLoading &&
            searchUser?.map((user: any, index: number) => {
              return (
                <UserSearchCard key={user._id} user={user} setOpen={setOpen} />
              );
            })}
        </div>
      </Box>
    </MSModal>
  );
};

export default SearchUserModal;
