import CForm from "@/components/Forms/CForm";
import CInput from "@/components/Forms/CInput";
import MSModal from "@/components/Shared/MSModal/MSModal";
import { uploadFile } from "@/helpers/uploadFile/uploadFile";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/userApi";
import { getUserInfo } from "@/services/authServices";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProfileModal = ({ open, setOpen }: TProps) => {
  const [profileUrl, setProfileUrl] = useState("");
  const [updateProfile] = useUpdateProfileMutation();

  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const handleUploadFile = async (e: any) => {
    const file = e.target.files[0];
    const uploadedFile = await uploadFile(file);
    console.log(uploadedFile);
    setProfileUrl(uploadedFile?.url);
  };
  const handleUpdateProfile = async (values: FieldValues) => {
    const updatedValues = {
      name: values.name,
      profile_pic: profileUrl || data?.data?.profile_pic,
    };
    try {
      const res = await updateProfile(updatedValues).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Profile updated successfully");
        setOpen(false);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <MSModal open={open} setOpen={setOpen} title={"Update Profile"}>
      <Box sx={{ minWidth: "300px" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              src={`${
                profileUrl
                  ? profileUrl
                  : data?.data?.profile_pic
                  ? data?.data?.profile_pic
                  : "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              }`}
              width={100}
              height={100}
              alt="profileImage"
              style={{
                borderRadius: "100%",
                marginBottom: "10px",
              }}
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
            <input
              onChange={handleUploadFile}
              type="file"
              id="profileImage"
              style={{ display: "none" }}
            />
          </Box>
        </Box>

        <CForm
          defaultValues={{ name: data?.data?.name }}
          onSubmit={handleUpdateProfile}
        >
          <Grid container spacing={1} mb={1}>
            <Grid item xs={12}>
              {" "}
              <Typography sx={{ fontWeight: 600, mb: "5px" }}>Name</Typography>
              <CInput type="text" name="name" />
            </Grid>
            {/* <Grid item xs={12}>
              {" "}
              <Typography sx={{ fontWeight: 600, mb: "5px" }}>Email</Typography>
              <CInput type="email" name="email" />
            </Grid> */}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: "20px",
            }}
          >
            <Button type="submit">Save Changes</Button>
          </Box>
        </CForm>
      </Box>
    </MSModal>
  );
};

export default EditProfileModal;
