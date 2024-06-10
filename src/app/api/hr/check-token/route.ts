import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { userId,token } = await request.json();

    // Find the user by email
    const user = await HrModel.findOne({ _id:userId });

    // If user not found, return error
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const secret= user.password+process.env.TOKEN_SECRET;
    const verify = await jwt.verify(token,secret);
    if(verify){
        const response = NextResponse.json(
            {
              success: true,
              message: "User found",
              user:{name: user.name,
              id:user._id,}
            },
            {
              status: 200,
            }
          );
        return response;
    }
    else{
        return NextResponse.json(
            {
              success: false,
              message: "Error finding the user",
            },
            {
              status: 500,
            }
          );

    }
    
  } catch (error) {
    console.error("Error Finding the user", error);
    return Response.json(
      {
        success: false,
        message: "Error finding the user",
      },
      {
        status: 500,
      }
    );
  }
}
