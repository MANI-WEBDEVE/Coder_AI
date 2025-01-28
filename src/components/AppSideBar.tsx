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

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-5 py-3">
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
      </SidebarHeader>
      <SidebarContent className="px-2 py-3">
        <Button className="mx-3"><MessageCircleCode/> Start the New Chat</Button>
        <SidebarGroup >
            <WorkSpaceHistory/>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
