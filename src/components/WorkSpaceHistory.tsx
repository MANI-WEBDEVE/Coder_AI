'use client'
import { UserDetailContext } from '@/context/userDetailContext'
import { useConvex } from 'convex/react'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useSidebar } from './ui/sidebar'

const WorkSpaceHistory = () => {
    const {toggleSidebar} = useSidebar()
    const {user, setUser}= useContext(UserDetailContext)
    const [workSpace, setWorkSpace] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const convex = useConvex()
    useEffect(() => {
        user?._id && user._id !== '' && GetAllUserData()
    }, [user])
    const GetAllUserData= async()=>{
        try{
            setIsLoading(true)
            const result = await convex.query(api.workspace.GetAllWorkSpace, {
                userId: user._id as any
            })
            console.log(result)
            setWorkSpace(result)
        }finally{
            setIsLoading(false)
        }
    }

  return (
    <div className='w-full h-full '>
      <h2 className='text-md font-medium text-center mt-1 uppercase'>Your Chats</h2>
      <div className='bg-neutral-700/20 w-full h-full p-3 mt-3 rounded'>
      {isLoading ? (<>
      <div className='w-full h-full flex items-center justify-center flex-col'>
        <Loader className='w-6 h-6 animate-spin'/>
        <h2 className='text-center mt-1 text-xs '>loading</h2>
      </div>
      </>) :(<>
        {
            workSpace&&workSpace.map((item:any, index:number) => (
                <Link onClick={toggleSidebar} key={index} href={`/workspace/${item._id}`}>
                <h2  className='text-sm font-medium bg-neutral-200/10 p-1 rounded-sm mt-2 text-gray-300 hover:text-white' >{item.messages[0].content}</h2>
                </Link>
            ))
        }
        </>)}
      </div>
    </div>
  )
}

export default WorkSpaceHistory
