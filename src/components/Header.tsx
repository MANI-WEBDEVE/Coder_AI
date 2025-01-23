import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

function Header() {
  return (
    <div className="p-4 flex items-center justify-between">
      <Image src={'/logo.webp'} width={40} height={40} alt='logo'/>
      <div className='flex space-x-4 gap-4'>
        <Button className='text-white  bg-neutral-500/10 ' variant='ghost'>Sign In</Button>
        <Button className='text-white py-2 ' style={{backgroundColor:"#0D6FE8"}}>Get Started</Button>
      </div>
    </div>
  )
}

export default Header
