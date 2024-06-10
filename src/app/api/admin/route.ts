import { getAdminFromToken } from "@/helpers/getAdminFromToken";
import dbConnect from "@/lib/dbConnect";
import AdminModel from "@/model/Admin";
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from "bcryptjs";

dbConnect();

export async function GET(request: NextRequest){
    try {
        const admin:any= await getAdminFromToken(request);
        console.log("Admin: ",admin);
        const adminData = await AdminModel.findOne({_id: admin.id}).select("-password");
        
        return NextResponse.json({
            message:"HR found",
            data:adminData
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            { status:400}
        );
        
    }
}



export async function PUT(request: Request) {
    await dbConnect();
  
    try {
      const { id,first_name, last_name, email, password } = await request.json();
      console.log("id",id);
      
      const existingUser = await AdminModel.findOne({_id:id});
      console.log("existingadmin:",existingUser);
      
      if (!existingUser) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "User with the provided email does not exist",
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
  
      existingUser.first_name = first_name;
      existingUser.last_name = last_name;
      existingUser.email=email;
      if (password) {
        existingUser.password = await bcrypt.hash(password, 10);
      }
  
      await existingUser.save();
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "Admin updated successfully",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error('Error updating admin:', error);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Error updating admin",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }