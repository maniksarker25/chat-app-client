"use client";
import ChatMessage from "@/components/UI/Chat/ChatMessage";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
const Message = () => {
  // const { userId } = params;
  const params = useParams();
  // console.log(" dynamic user", params?.userId);
  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#E1E7EF" }}>
      <ChatMessage userId={params?.userId as string} />
    </Box>
  );
};

export default Message;
