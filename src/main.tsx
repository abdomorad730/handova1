import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "flowbite";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContextProvider } from "./Components/Context/UserContext.tsx";
import RoleContextProvider from "./Components/Context/RoleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RoleContextProvider>
            <App />
            <ToastContainer />
        </RoleContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
