"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { MessageContext } from "@/context/MessageContext";
import prompts from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/userDetailContext";
import SandPackPreviewClient from "./SandPackPreviewClient";
import { ActionContext } from "@/context/ActionContext";
function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { inputMessage, setInputMessage } = useContext(MessageContext);
  const updateFiles = useMutation(api.workspace.updateFiles);
  const convex = useConvex();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const UpdateToken = useMutation(api.users.updateToken);
  const { user, setUser } = useContext(UserDetailContext);
    const { action, setAction } = useContext(ActionContext);
  const GetWorkSpaceFilesData = async () => {
    try {
      setIsLoading(true);
      const GetFilesData = await convex.query(api.workspace.GetWorkSpace, {
        workspaceId: id as any,
      });
      const mergedFile = { ...Lookup.DEFAULT_FILE, ...GetFilesData?.fileData };
      setFiles(mergedFile);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetWorkSpaceFilesData();
  }, [id]);

  useEffect(()=>{
    setActiveTab('preview')
  },[action])

  useEffect(() => {
    if (inputMessage.length > 0) {
      const role = inputMessage[inputMessage.length - 1].role;
      if (role == "user") {
        GenerateCodeAI();
      }
    }
  }, [inputMessage]);

  const GenerateCodeAI = async () => {
    const PROMPT = JSON.stringify(inputMessage) + " " + prompts.CODE_GEN_PROMPT;
    try {
      setIsLoading(true);
      const response = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });
      const aiResp = response.data.data;
      const mergedFile = { ...Lookup.DEFAULT_FILE, ...aiResp.files };
      setFiles(mergedFile);
      await updateFiles({
        workspaceId: id as any,
        files: aiResp.files,
      });

      const token =
        Number(user.token) - Number(countToken(JSON.stringify(aiResp)));
      // update token in DataBase
      await UpdateToken({
        userId: user._id as any,
        token: token,
      });
      setUser({
        ...user,
        token: token,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] rounded w-full p-2">
        <div className="flex items-center gap-2 bg-black w-[150px] justify-center flex-wrap shrink-0 rounded-full py-1">
          <h2
            className={`px-2 py-1 text-sm rounded-full border cursor-pointer   ${activeTab == "code" && "bg-blue-700/20 text-blue-600 border-none"}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`px-2 py-1 text-sm rounded-full border cursor-pointer   ${activeTab == "preview" && "bg-blue-700/20 text-blue-600 border-none"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
        template="react"
        files={files}
        theme={"dark"}
        customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
        }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "82vh" }} />
              <SandpackCodeEditor style={{ height: "82vh" }} />
            </>
          ) : (
            <SandPackPreviewClient/>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {isLoading && (
        <div className="bg-[#181818cd] rounded w-full p-2 mt-2 flex items-center justify-center flex-col absolute h-full top-0 right-0">
          <Loader className="animate-spin h-10 w-10" />
          <h2 className="text-lg text-center  mt-2">Generating a Files 🤖</h2>
        </div>
      )}
    </div>
  );
}

export default CodeView;
