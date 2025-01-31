import ChatView from '@/components/ChatView'
import CodeView from '@/components/CodeView'
import React from 'react'

function page() {
  return (
    <div className='p-2 pr-8 w-full h-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-full'>
            <ChatView/>
            <div className='col-span-2 w-full h-full'>
                <CodeView/>
            </div>
        </div>
    </div>
  )
}

export default page
