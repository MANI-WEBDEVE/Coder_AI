'use client';
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import Colors from '@/data/Colors';
import { MessageContext } from '@/context/MessageContext';
import { UserDetailContext } from '@/context/userDetailContext';
import SignInDailog from './SignInDailog';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'next/navigation';
function Hero() {
    const [userInput, setUserInput] = useState<string>  ('')
    const [openDailog, setOpenDailog] = useState(false)

    const {inputMessage, setInputMessage} = useContext(MessageContext) 

    const {user, setUser} = useContext(UserDetailContext)
    const router = useRouter()
   const createWorkSpace = useMutation(api.workspace.CreateWorkSpace)
    const onGenerate = async (input:string) => {
        if (!user.name){
          console.log(user, 'lo')
            setOpenDailog(true)
            return;
        }
        const msg={
            role: 'user',
            content: input
        }
        setInputMessage(msg)
        const workSpaceId = await createWorkSpace({
            messages: [msg],
            user: user._id
        })
        console.log(workSpaceId)
        router.push(`/workspace/${workSpaceId}`)
    } 
  return (
    <div className='flex flex-col items-center mt-36 xl:mt-42 gap-2'>
      <h2 className='font-bold text-4xl'>{Lookup.HERO_HEADING}</h2>
      <p className='text-gray-400 font-medium'>{Lookup.HERO_DESC}</p>
      <div className='p-5 border rounded-xl max-w-xl w-full mt-3 '
      style={{backgroundColor:Colors.BACKGROUND}} >
        <div className='flex gap-2'>
            <textarea name="" id="" placeholder={Lookup.INPUT_PLACEHOLDER}
            className='outline-none resize-none w-full h-32 max-h-40 bg-transparent' 
            onChange={(e) => setUserInput(e.target.value)}
            />  
            {userInput && (
                <ArrowRight size={37} onClick={() => onGenerate(userInput)} className='cursor-pointer bg-blue-700 rounded-md px-2 py-2 '/>
            )}
        </div>
        <div>
            <Link size={21}/>
        </div>
      </div>
      <div className='flex flex-wrap max-w-2xl justify-center gap-2 items-center mt-8'>
        {Lookup.SUGGSTIONS.map((suggestion) => (
            <div key={suggestion} onClick={() => onGenerate(suggestion)} className=' px-3 py-1 rounded-full cursor-pointer border text-gray-400 text-sm hover:text-white'>{suggestion}</div>
        ))}
      </div>
      <SignInDailog openDailog={openDailog} closeDailog={(e:boolean) => setOpenDailog(e) }/>
    </div>
  )
}

export default Hero
