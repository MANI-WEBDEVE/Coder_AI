'use client'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { api } from '../../convex/_generated/api'
import { MessageContext } from '@/context/MessageContext'
import Colors from '@/data/Colors'
import { UserDetailContext } from '@/context/userDetailContext'
import Image from 'next/image'

function ChatView() {
    const {id} = useParams()
    const convex = useConvex()
    const {inputMessage, setInputMessage} =useContext(MessageContext)
    const {user, setUser} = useContext(UserDetailContext)
    useEffect(( ) => {
        id&&getWorkSpace()
    }, [id])

    const getWorkSpace = async () =>{
        const result = await convex.query(api.workspace.GetWorkSpace, {workspaceId: id as any})
        setInputMessage(result?.messages || [])
        console.log(result)
    }
    console.log(inputMessage, "all")
  return (
    <div>
      <div>
        {inputMessage?.map((msg, index) => (
          <div key={index} className='p-3 rounded-lg'
          style={{backgroundColor: Colors.CHAT_BACKGROUND}}
          >
            {msg.role == 'user' && (
              <Image src={user.image} alt='userImage' width={30} height={30} className='rounded-full'/>
            )}
            <p className='text-white' >{msg.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatView
