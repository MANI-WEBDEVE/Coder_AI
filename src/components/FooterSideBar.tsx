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
            icon: LogOut,
            val:"logout"
        }
    ]

    const handleClick=(option:any)=>{
        if (option.path == "/pricing"){
            router.push(option.path)
        }
    }

    const logOut=(val:string)=>{
        if(val==='logout'){
            localStorage.removeItem('user')
            window.location.reload()
           
        }
    }

  return (
    <div className='p-2 mb-10'>
        {
            option.map((opt, index) => (
                <Button  key={index} className='flex justify-start gap-2' variant={"ghost"} onClick={()=> opt.val ? logOut(opt.val) : handleClick(opt)}>
                    <opt.icon/>
                    {opt.name}
                </Button>
            ))
        }
    </div>
  )
}

export default FooterSideBar
