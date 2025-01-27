import Image from 'next/image'
import React, { useContext } from 'react'
import { Button } from './ui/button'
import { UserDetailContext } from '@/context/userDetailContext'

function Header() {
  const {user , setUser} = useContext(UserDetailContext)
  return (
    <div className="p-4 flex items-center justify-between">
      <Image src={'/logo.webp'} width={40} height={40} alt='logo'/>
      {
        user.name && user.email ? (
          <>
             <div className='flex  gap-2 items-center'>
              <Image
                src={user.image}
                width={30}
                height={30}
                alt={user.name}
                className='rounded-full border-[1px] border-white'
                />
                <h2 className='uppercase text-sm bg-slate-600/25 px-2 rounded-lg'>{user.name}</h2>
             </div>
          </>
        ) : (
          <>
           <div className='flex space-x-4 gap-4'>
        <Button className='text-white  bg-neutral-500/10 ' variant='ghost'>Sign In</Button>
        <Button className='text-white py-2 ' style={{backgroundColor:"#0D6FE8"}}>Get Started</Button>
      </div>
          </>
        )
      }
     
    </div>
  )
}

export default Header
