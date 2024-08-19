"use client";

import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SocketProvider } from "@/context/SocketContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SocketProvider>
    </Provider>
  );
};

export default Providers;
