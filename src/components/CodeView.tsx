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
import prompts from "@/data/Prompt"
import axios from "axios";
function CodeView() {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE)
  const {inputMessage, setInputMessage} = useContext(MessageContext)


  useEffect(() => {
    if (inputMessage.length>0){
      const role = inputMessage[inputMessage.length-1].role
      if (role == "user"){
        GenerateCodeAI()
      }
    }
  }, [inputMessage])

  const GenerateCodeAI = async () => {
    const PROMPT = JSON.stringify(inputMessage)+" "+prompts.CODE_GEN_PROMPT
    try{
      const response = await axios.post("/api/gen-ai-code",{
        prompt:PROMPT
      })
      const aiResp= response.data.data
      const mergedFile = {...Lookup.DEFAULT_FILE, ...aiResp.files}
      setFiles(mergedFile)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
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
      <SandpackProvider template="react" files={files} theme={"dark"} customSetup={{dependencies: {...Lookup.DEPENDANCY}}} 
      options={{
        externalResources:['https://unpkg.com/@tailwindcss/browser@4']
      }}
      >
        <SandpackLayout>
          {activeTab == "code" ? (
            <>
            <SandpackFileExplorer style={{ height: "82vh" }} />
            <SandpackCodeEditor style={{ height: "82vh" }} />
            </>
          ):(
            <SandpackPreview style={{ height: "82vh" }} showNavigator={true}/>
          )}
          
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
