"use client";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { MessageContext } from "@/context/MessageContext";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/userDetailContext";
import Image from "next/image";
import { ArrowRight, Bot, Link, LoaderCircleIcon, LoaderPinwheel } from "lucide-react";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { inputMessage = [], setInputMessage } = useContext(MessageContext);
  const { user, setUser } = useContext(UserDetailContext);
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const updateWorkSpaceMessages = useMutation(api.workspace.updateWorkSpace)
  useEffect(() => {
    id && getWorkSpace();
  }, [id]);

  const getWorkSpace = async () => {
    const result = await convex.query(api.workspace.GetWorkSpace, {
      workspaceId: id as any,
    });
    setInputMessage(result?.messages || []);
  };

  const GetAiResponse = async () => {
    const PROMPT = JSON.stringify(inputMessage) + Prompt.CHAT_PROMPT
    try{
      setLoading(true)
      const response = await axios.post('/api/ai-chat',{
        prompt:PROMPT
      })
      console.log(response.data.res)
      const aiResp={
        role: "ai",
        content: response.data.res,
      }
      setInputMessage((prev:any) => [
        ...prev,
        aiResp
      ]);
      await updateWorkSpaceMessages({
        workspaceId:id as any,
        messages:[...inputMessage, aiResp]
      })
    }catch(err){
      console.log(err)
      setLoading(false)
    } 
    finally{
      setLoading(false)
    }

  }

  useEffect(() => {
    if (inputMessage.length > 0){
      const role = inputMessage[inputMessage.length -1].role
      if(role == 'user'){
        GetAiResponse()
      }
    }
  }, [inputMessage])


  const onGenerate = (input: string) => {
    setInputMessage((prev: any) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput('')
  };

  console.log(inputMessage, "all");
  return (
    <div className="relative flex flex-col gap-2 h-[85vh] w-full">
      <div className="flex-1 overflow-y-scroll flex gap-1 flex-col p-3 scrollbar-hide">
        {inputMessage.length == 0 && (
          <div className="flex flex-col gap-2 items-center justify-center h-full">
            <Image
              src={user.image}
              alt="userImage"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="text-white text-center">
               WelCome AI Coder App
            </p>
          </div>
        )}
        {inputMessage?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg"
            style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
          >
            {msg.role == "user" ? (
              <Image
                src={user.image}
                alt="userImage"
                width={30}
                height={30}
                className="rounded-full"
              />
            ) : (
              <>
                <Bot className="text-blue-500"/>
              </>
            )}
            <p className="text-white leading-7 text-sm">{msg.content}</p>
          </div>
        ))}
        {
          loading && (
            <div className="p-3 rounded-lg flex items-center gap-2" style={{ backgroundColor: Colors.CHAT_BACKGROUND }}>
              <LoaderCircleIcon className="animate-spin"/>
              <p className="text-white">Genrating Response...</p>
            </div>
          )
        }
      </div>
      {/* Input section */}
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3 "
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
          value={userInput}
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
    </div>
  );
}
  
export default ChatView;
