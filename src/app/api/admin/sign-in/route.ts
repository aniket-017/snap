import dbConnect from "@/lib/dbConnect";
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "@/model/Admin";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { email, password } = await request.json();
        
        // Find the user by email
        const user = await AdminModel.findOne({ email });

        // If user not found, return error
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Admin not found",
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
            first_name : user.first_name,
            last_name : user.last_name,
            email: user.email,
        }
        

        const token = await jwt.sign({tokenData:tokenData}, process.env.TOKEN_SECRET!,{ expiresIn : '1d'});

        // If email and password are correct, return success message
        const response=NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                first_name: user.first_name,
                email: user.email,
            },
        }, {
            status: 200,
        })
            response.cookies.set("admin_token",token,{
                httpOnly:true
            })
            response.cookies.set("internal_token","",{
                httpOnly:true,
                expires: new Date(0)
            });
            response.cookies.set("external_token","",{
                httpOnly:true,
                expires: new Date(0)
            });
        

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
