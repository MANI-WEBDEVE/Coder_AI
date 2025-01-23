import { createContext } from "react";

export const MessageContext = createContext({
    inputMessage: [{ role: '', content: '' }],
  setInputMessage: (message: any) => {},
});
