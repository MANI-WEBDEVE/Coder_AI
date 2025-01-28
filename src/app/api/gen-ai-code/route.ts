import { NextResponse } from "next/server"
import { GenAICode } from "../../../../config/AIModel"

export const POST =async (request:Request) => {
    const {prompt}=await request.json()
    try{
        const result = await GenAICode.sendMessage(prompt)
        const resp = result.response.text()
        return NextResponse.json({
            data:JSON.parse(resp),
            status:200,
            message:"Success create response"
        })
    }catch(err){
        return NextResponse.json(
            {
                message:"some thing went wrong",
                status:500,
                error:err
            }
        )
    }
}