import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";
import {NextRequest, NextResponse} from 'next/server';

dbConnect();

export async function GET(request: NextRequest){
    try {
        const hr_id:any= await getDataFromToken(request);
        console.log("HR id:",hr_id);
        const hr = await HrModel.findOne({_id: hr_id}).select("-password");
        
        return NextResponse.json({
            message:"HR found",
            data:hr
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            { status:400}
        );
        
    }
}
