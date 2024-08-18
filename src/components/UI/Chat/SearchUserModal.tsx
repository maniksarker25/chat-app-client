import MSModal from "@/components/Shared/MSModal/MSModal";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { useDebounce } from "@/redux/hooks";
import { Box, TextField } from "@mui/material";
import { useState } from "react";

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
  console.log(data);
  return (
    <MSModal open={open} setOpen={setOpen} title="Search User">
      <Box sx={{ minWidth: "400px", minHeight: "200px" }}>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          label="Search user by name,email.."
          fullWidth
        />
      </Box>
    </MSModal>
  );
};

export default SearchUserModal;
