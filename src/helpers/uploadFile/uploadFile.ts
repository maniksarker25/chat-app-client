export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log("start upload");
  formData.append("upload_preset", "chat-app-file");
  console.log(process.env.NEXT_PUBLIC_CLOUD_URL);
  const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUD_URL}`, {
    method: "POST",
    body: formData,
  });
  console.log("end upload");
  const data = await res.json();
  return data;
};
