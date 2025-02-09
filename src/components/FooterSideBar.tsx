import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const FooterSideBar = () => {

    const option = [
        {
            name:"Setting",
            icon:Settings
        },
        {
            name:"Help Center",
            icon: HelpCircle
        },
        {
            name:"My Subscription",
            icon: Wallet
        },{
            name:"Logout",
            icon: LogOut
        }
    ]

  return (
    <div className='p-2 mb-10'>
        {
            option.map((opt, index) => (
                <Button className='flex justify-start gap-2' variant={"ghost"}>
                    <opt.icon/>
                    {opt.name}
                </Button>
            ))
        }
    </div>
  )
}

export default FooterSideBar
