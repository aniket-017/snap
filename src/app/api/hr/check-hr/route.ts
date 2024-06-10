import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email } = await request.json();

    // Find the user by email
    const user = await HrModel.findOne({ email });

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
    const response = NextResponse.json(
      {
        success: true,
        message: "User found",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );

    return response;
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
