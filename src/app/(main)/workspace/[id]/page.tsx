import ChatView from '@/components/ChatView'
import CodeView from '@/components/CodeView'

import React from 'react'

function page() {
  return (
    <div className='p-2 md:pr-8 w-full h-full flex '>
      
        <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center md:gap-10 w-full h-full'>
            <ChatView/>
            <div className='col-span-2 w-full h-full mt-10'>
                <CodeView/>
            </div>
        </div>
    </div>
  )
}

export default page
