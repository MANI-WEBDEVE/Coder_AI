"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserDetailContext } from "@/context/userDetailContext";
import Link from "next/link";
import { Download, Infinity, Rocket } from "lucide-react";
import SignInDailog from "./SignInDailog";
import { ActionContext } from "@/context/ActionContext";

function Header() {
  const { user, setUser } = useContext(UserDetailContext);
  const [openDailog, setOpenDailog] = useState(false);
  const { action, setAction } = useContext(ActionContext);
  const signInUser = () => {
    if (!user.name) {
      setOpenDailog(true);
      return;
    }
  };

  const onActionButton = (action: string) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };
  return (
    <div className="p-4 flex items-center justify-between">
      <Link href={"/"}>
        <Image src={"/coder-ai-logo.png"} width={80} height={80} alt="logo" />
      </Link>
      {user.name && user.email ? (
        <>
          <div className="flex  gap-4 items-center">
            <div className="flex gap-2">
              <Button
                className="text-white  bg-neutral-500/10 "
                variant="ghost"
                onClick={()=>onActionButton('export')}
              >
                <Download />
                Export
              </Button>
              <Button
                className="text-white py-2 "
                style={{ backgroundColor: "#0D6FE8" }}
                onClick={()=>onActionButton('deploy')}
              >
                <Rocket />
                Deploy
              </Button>
            </div>
            {user.image && (
              <Image
                src={user.image}
                width={30}
                height={30}
                alt={user.name}
                className="rounded-full border-[1px] border-white"
              />
            )}

            <p className="truncate ">
              {user.token > 10000000000000 ? <Infinity /> : user.token}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex space-x-4 gap-4">
            <Button
              onClick={signInUser}
              className="text-white  bg-neutral-500/10 "
              variant="ghost"
            >
              Sign In
            </Button>
            <Button
              onClick={signInUser}
              className="text-white py-2 "
              style={{ backgroundColor: "#0D6FE8" }}
            >
              Get Started
            </Button>
          </div>
          <SignInDailog
            openDailog={openDailog}
            closeDailog={(e: boolean) => setOpenDailog(e)}
          />
        </>
      )}
    </div>
  );
}

export default Header;
