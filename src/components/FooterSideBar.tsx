import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const FooterSideBar = () => {
    const router = useRouter()
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
            icon: Wallet,
            path:"/pricing"
        },{
            name:"Logout",
            icon: LogOut
        }
    ]

    const handleClick=(option:any)=>{
        if (option.path == "/pricing"){
            router.push(option.path)
        }
    }

  return (
    <div className='p-2 mb-10'>
        {
            option.map((opt, index) => (
                <Button key={index} className='flex justify-start gap-2' variant={"ghost"} onClick={()=>handleClick(opt)}>
                    <opt.icon/>
                    {opt.name}
                </Button>
            ))
        }
    </div>
  )
}

export default FooterSideBar
