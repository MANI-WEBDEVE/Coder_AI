import { createContext } from "react";

export const ActionContext=createContext({
    action: { actionType: '', timeStamp: Date.now() },
    setAction:(action:any)=>{}
})