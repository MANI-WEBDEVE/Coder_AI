import { NextResponse } from "next/server";
import { chatSession } from "../../../../config/AIModel";


export const POST =async (request:Request) => {
    const {prompt} = await request.json()
    
    try{
        const result = await chatSession.sendMessage(prompt);
        const AI_RESPONSE = result.response.text()
        return NextResponse.json({
            res:AI_RESPONSE,
            status:200,
            message:"Success create response"
        })
    } catch(err) {
        return NextResponse.json({
            message:"Something went wrong",
            error:err,
            status:500
        })
    }
}