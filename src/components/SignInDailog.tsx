import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";

import React, { useContext } from "react";
import { Button } from "./ui/button";
import Colors from "@/data/Colors";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/userDetailContext";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const SignInDailog = ({
  openDailog,
  closeDailog,
}: {
  openDailog: boolean;
  closeDailog: any;
}) => {

  const {user, setUser} = useContext(UserDetailContext)
  const createUser = useMutation(api.users.CreateUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer '+tokenResponse.access_token } },
      );
  
      console.log("data User ---++",userInfo.data);
      const userData = userInfo.data;

      await createUser({
        name: userData.name,
        email: userData.email,
        image: userData.picture,
        uid: userData.sub
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify({
          name: userInfo.data.name,
          email: userInfo.data.email,
          image: userInfo.data.picture
        }));
      }
      setUser({
        name: userInfo.data.name,
        email: userInfo.data.email,
        image: userInfo.data.picture,
        _id: '',
        token: 50000
      });
      closeDailog(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });


  return (
    <Dialog open={openDailog} onOpenChange={closeDailog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex flex-col gap-2 justify-center items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white text-center">
                {Lookup.SIGNIN_HEADING}
              </h2>
              <p className="text-xs mt-2 text-center">
                {Lookup.SIGNIN_SUBHEADING}
              </p>
              <div className="flex gap-2 mt-4 justify-center">
                <Button
                  variant={"default"}
                  style={{ backgroundColor: Colors.BLUE }}
                  className=" text-black px-4 py-2 rounded-md border-none focus:border-none"
                  onClick={() => googleLogin()}
                >
                  SIGN IN WITH GOOGLE
                </Button>
              </div>
              <p className="text-xs mt-4 text-center">
                {Lookup.SIGNIn_AGREEMENT_TEXT}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader> 
      </DialogContent>
    </Dialog>
  );
}; 
 
export default SignInDailog;
