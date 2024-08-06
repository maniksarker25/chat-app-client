import MSModal from "@/components/Shared/MSModal/MSModal";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileModal = ({ open, setOpen }: TProps) => {
  return (
    <MSModal open={open} setOpen={setOpen} title={"Update Profile"}>
      <Box>
        <Typography>Nice modal</Typography>
      </Box>
    </MSModal>
  );
};

export default EditProfileModal;
