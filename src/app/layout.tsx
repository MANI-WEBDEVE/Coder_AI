import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import ConvexClientProvider from "./ConvexClientProvider";
import {Toaster} from 'react-hot-toast'
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import Colors from "@/data/Colors";

export default function RootLayout({

  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const {toggleSidebar}=useSidebar()
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <Provider>
            
            {children}
            <Toaster 
            />
            </Provider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
