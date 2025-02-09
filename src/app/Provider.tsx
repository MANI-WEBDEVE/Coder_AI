"use client";
import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
function Provider({ children }: { children: React.ReactNode }) {
  const [inputMessage, setInputMessage] = useState([
    {
      role: "",
      content: "",
    },
  ]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    _id: "",
    token: 0 as any
  });
  const convex = useConvex()
    const isAuthenticated = async () => {
      if (typeof window !== 'undefined'){
        const user = JSON.parse(localStorage.getItem("user") as string);
        const result = await convex.query(api.users.GetUser, {email: user.email});
        console.log(result)
        setUser({
          name: result.name,
          email: result.email,
          image: result.image,
          _id: result._id,
          token: result.token
        })
      }
    }

    useEffect(() => {
      isAuthenticated();
    }, [] )


  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        <UserDetailContext.Provider value={{ user, setUser }}>
          <MessageContext.Provider value={{ inputMessage, setInputMessage }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >

              <Header />
              <SidebarProvider defaultOpen={false }>
                <AppSideBar/>
               {children}
              </SidebarProvider>
            </NextThemesProvider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
