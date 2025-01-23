import { createContext } from "react";

export const UserDetailContext = createContext({
    user: { name: '', email: '', image: '', _id: '' },
    setUser: (user: { name: string; email: string, image:string, _id: string }) => {},
});