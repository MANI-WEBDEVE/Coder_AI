"use client";
import React, {  useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/userDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import Footer from "@/components/Footer";
import { ActionContext } from "@/context/ActionContext";
import { useRouter } from "next/navigation";
function Provider({ children }: { children: React.ReactNode }) {
  const router=useRouter()
  const [inputMessage, setInputMessage] = useState([
    {
      role: "",
      content: "",
    },
  ]);
  const [action, setAction] = useState({
    actionType: "",
    timeStamp: Date.now(),
  });
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
        if(!user){
          router.push('/')
          return 
        }
        const result = await convex.query(api.users.GetUser, {email: user.email});
        if(!result.name&&!result.email&&!result._id){
          router.push('/')
          return 
        }
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
            <ActionContext.Provider value={{action, setAction}} >
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
              <Footer/>
            </NextThemesProvider>
            </ActionContext.Provider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Provider;
