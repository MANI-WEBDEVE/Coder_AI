import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkSpaceHistory from "./WorkSpaceHistory";
import Link from "next/link";
import FooterSideBar from "./FooterSideBar";

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-5 py-3">
        <Link href={'/'}>
        <div className="flex items-center gap-2 ">
          <Image
            src={"/download.svg"}
            width={50}
            height={50}
            alt="logo"
            className="invert"
            />
          <Image src={"/logo.webp"} width={29} height={29} alt="logo" />
        </div>
        </Link>
        <Button className="mx-3 mt-3"><MessageCircleCode/> Start the New Chat</Button>
      </SidebarHeader>
      <SidebarContent className="px-2 py-3 scrollbar-hide">
        <SidebarGroup >
            <WorkSpaceHistory/>
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter >
        <FooterSideBar/>
      </SidebarFooter>
    </Sidebar>
  );
}
