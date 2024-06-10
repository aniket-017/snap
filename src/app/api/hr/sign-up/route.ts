import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    await dbConnect()

    try {
       const {name,email,role,company,password}= await request.json()
       const existingUserByEmail= await HrModel.findOne({
        email
       })
       
       if (existingUserByEmail) {
        return Response.json(
            {
                success: false,
                message: "User with the email already exist"
            },
            {
                status: 400
            }
        )  
       }else{
        const hashedPassword= await bcrypt.hash(password,10)
        const newUser=new HrModel({
            name: name,
            email,
            role,
            company,
            password: hashedPassword,
        })

        await newUser.save()
        return Response.json(
            {
                success: true,
                message: "User created"
            },
            {
                status: 200
            }
        )
       }


    } catch (error) {
        console.error('Error registering internal HR',error);
        return Response.json(
            {
                success: false,
                message: "Error registering internal HR"
            },
            {
                status: 500
            }
        )
    }
}