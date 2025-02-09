import { createContext } from "react";

export const UserDetailContext = createContext({
    user: { name: '', email: '', image: '', _id: '', token:0 },
    setUser: (user: { name: string; email: string, image:string, _id: string, token:number }) => {},
});