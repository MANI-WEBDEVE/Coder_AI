import ChatView from '@/components/ChatView'
import CodeView from '@/components/CodeView'
import React from 'react'

function page() {
  return (
    <div className='p-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            <ChatView/>
            <div className='cols-span-2'>
                <CodeView/>
            </div>
        </div>
    </div>
  )
}

export default page
