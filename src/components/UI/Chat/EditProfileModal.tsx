import CForm from "@/components/Forms/CForm";
import CInput from "@/components/Forms/CInput";
import MSModal from "@/components/Shared/MSModal/MSModal";
import { getUserInfo } from "@/services/authServices";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileModal = ({ open, setOpen }: TProps) => {
  const userInfo = getUserInfo();
  console.log(userInfo);
  const handleUpdateProfile = () => {};
  return (
    <MSModal open={open} setOpen={setOpen} title={"Update Profile"}>
      <Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={
                "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              }
              width={100}
              height={100}
              alt="profileImage"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <label
              style={{
                backgroundColor: "#1586FD",
                color: "white",
                paddingLeft: "5px",
                paddingRight: "5px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              htmlFor="profileImage"
            >
              Change Photo
            </label>
            <input type="file" id="profileImage" style={{ display: "none" }} />
          </Box>
        </Box>

        <CForm onSubmit={handleUpdateProfile}>
          <Grid container spacing={1} mb={1}>
            <Grid item xs={12}>
              {" "}
              <Typography sx={{ fontWeight: 600, mb: "5px" }}>Name</Typography>
              <CInput type="text" name="name" />
            </Grid>
            <Grid item xs={12}>
              {" "}
              <Typography sx={{ fontWeight: 600, mb: "5px" }}>Email</Typography>
              <CInput type="email" name="email" />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: "20px",
            }}
          >
            <Button>Save Changes</Button>
          </Box>
        </CForm>
      </Box>
    </MSModal>
  );
};

export default EditProfileModal;
