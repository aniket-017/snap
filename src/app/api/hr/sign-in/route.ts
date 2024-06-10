import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { email, password } = await request.json();
        
        // Find the user by email
        const user = await HrModel.findOne({ email });

        // If user not found, return error
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, {
                status: 404,
            });
        }

        // Check if password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        // If password doesn't match, return error
        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid email or password",
            }, {
                status: 400,
            });
        }

        const tokenData = {
            id: user._id,
            name : user.name,
            email: user.email,
            role:user.role
        }

        const token = await jwt.sign({tokenData:tokenData}, process.env.TOKEN_SECRET!,{ expiresIn : '1d'});

        // If email and password are correct, return success message
        const response=NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
            },
        }, {
            status: 200,
        })
        if(user.role=="internal"){
            response.cookies.set("internal_token",token,{
                httpOnly:true
            })
        }
        else if(user.role=="external"){
            response.cookies.set("external_token",token,{
                httpOnly:true
            })
        }
        

        return response
    } catch (error) {
        console.error('Error signing in', error);
        return Response.json({
            success: false,
            message: "Error signing in",
        }, {
            status: 500,
        });
    }
}
