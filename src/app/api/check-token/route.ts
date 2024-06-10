import { getAdminFromToken } from "@/helpers/getAdminFromToken";
import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";
import {NextRequest, NextResponse} from 'next/server';

dbConnect();

export async function GET(request: NextRequest){
    try {
        const admin:any= await getAdminFromToken(request);
        // console.log("Admin: ",admin);
        // const adminData = await AdminModel.findOne({_id: admin.id}).select("-password");
        if(admin.id){
            return NextResponse.json({
                message:"HR found",
                data:true
            })
        }
        else{
            return NextResponse.json({
                message:"HR found",
                data:false
            })
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            { status:400}
        );
        
    }
}