import dbConnect from "@/lib/dbConnect";
import HrModel from "@/model/HR";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const HRs = await HrModel.find({});
        return new Response(
            JSON.stringify({
                success: true,
                data: HRs
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error fetching HRs', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error fetching products"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}


export async function POST(request: Request){
    await dbConnect()

    try {
       const {name,email,role,company,password,plan,
        report_access}= await request.json()
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
        const newUser=new HrModel({
            name: name,
            email,
            role,
            company,
            password: password,
            plan:plan,
            report_access:report_access,
        })

        const hr= await newUser.save()
        return Response.json(
            {
                success: true,
                message: "User created",
                hr:hr,
            },
            {
                status: 200
            }
        )
       }


    } catch (error) {
        console.error('Error registering HR',error);
        return Response.json(
            {
                success: false,
                message: "Error registering HR"
            },
            {
                status: 500
            }
        )
    }
}



export async function PUT(request: Request) {
    await dbConnect();

    try {
        const { id, ...updates } = await request.json();

        // Find the plan by its ID
        const existingHR = await HrModel.findById(id);

        // If the plan doesn't exist, return an error response
        if (!existingHR) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "HR not found"
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        // Update the plan with the provided updates
        Object.assign(existingHR, updates);

        // Save the updated plan
        await existingHR.save();

        // Return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "HR updated successfully"
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating HR', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error updating HR"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}



export async function DELETE(request: Request) {
    await dbConnect();

    try {
        const { id } = await request.json();

        // Find the plan by its ID and delete it
        const deletedPlan = await HrModel.findByIdAndDelete(id);

        // If the plan doesn't exist, return an error response
        if (!deletedPlan) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "HR not found"
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        // Return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "HR deleted successfully"
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error deleting HR', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error deleting HR"
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}