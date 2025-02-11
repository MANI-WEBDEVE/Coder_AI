import React from 'react'
import TooltipGit from './TooltipGit'

const Footer = () => {
  return (
    <div className='h-full flex items-center flex-col gap-5 justify-center md:flex-row md:justify-around p-10 '>
        <div>
            <p className='text-lg font-medium text-gray-400 hover:text-blue-600 transition-colors duration-300'>Developed By <span className='uppercase tracking-widest'>Inam</span></p>
        </div>
      <TooltipGit/>
    </div>
  )
}

export default Footer
