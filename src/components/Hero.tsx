"use client";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link, PanelLeftOpen } from "lucide-react";
import React, { useContext, useState } from "react";
import Colors from "@/data/Colors";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/userDetailContext";
import SignInDailog from "./SignInDailog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useSidebar } from "./ui/sidebar";
import toast from "react-hot-toast";
function Hero() {
  const {toggleSidebar}=useSidebar()
  const [userInput, setUserInput] = useState<string>("");
  const [openDailog, setOpenDailog] = useState(false);

  const { inputMessage, setInputMessage } = useContext(MessageContext);

  const { user, setUser } = useContext(UserDetailContext);
  const router = useRouter();
  const createWorkSpace = useMutation(api.workspace.CreateWorkSpace);
  const onGenerate = async (input: string) => {
    
    if (!user.name) {
      setOpenDailog(true);
      return;
    }
    if(user.token < 20){
      toast.error("You don't have enough token to generate workspace.Please buy token ")
      return
    }
    const msg = {
      role: "user",
      content: input,
    };
    setInputMessage(msg);
    const workSpaceId = await createWorkSpace({
      messages: [msg],
      user: user._id,
    });
    router.push(`/workspace/${workSpaceId}`);
  };
  return (
    <>
      <div className="px-5 mt-3 cursor-pointer ">
        
        <PanelLeftOpen onClick={toggleSidebar}/>
      </div>

      <div className="flex flex-col items-center mt-20 px-5 xl:mt-42 gap-2 w-full">
        <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
        <div
          className="p-5 border rounded-xl max-w-xl w-full mt-3 "
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <div className="flex gap-2">
            <textarea
              name=""
              id=""
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none resize-none w-full h-32 max-h-40 bg-transparent"
              onChange={(e) => setUserInput(e.target.value)}
            />
            {userInput && (
              <ArrowRight
                size={37}
                onClick={() => onGenerate(userInput)}
                className="cursor-pointer bg-blue-700 rounded-md px-2 py-2 "
              />
            )}
          </div>
          <div>
            <Link size={21} />
          </div>
        </div>
        <div className="flex flex-wrap max-w-2xl justify-center gap-2 items-center mt-8">
          {Lookup.SUGGSTIONS.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => onGenerate(suggestion)}
              className=" px-3 py-1 rounded-full cursor-pointer border text-gray-400 text-sm hover:text-white"
            >
              {suggestion}
            </div>
          ))}
        </div>
        <SignInDailog
          openDailog={openDailog}
          closeDailog={(e: boolean) => setOpenDailog(e)}
        />
      </div>
    </>
  );
}

export default Hero;
