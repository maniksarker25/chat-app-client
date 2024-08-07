export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-file");
  const res = await fetch(`${process.env.NEXT_CLOUD_UR}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};
