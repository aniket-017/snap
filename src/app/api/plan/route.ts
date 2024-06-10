import dbConnect from "@/lib/dbConnect";
import PlanModel from "@/model/Plan";

export async function POST(request: Request){
    await dbConnect()

    try {
       const {planName,planPrice,products}= await request.json()
       const existingPlan= await PlanModel.findOne({
        planName
       })
       
       if (existingPlan) {
        return Response.json(
            {
                success: false,
                message: "plan already exist"
            },
            {
                status: 400
            }
        )  
       }else{
        const newPlan =new PlanModel({
            planName: planName,
            planPrice:planPrice,
            products:products
        })

        await newPlan.save()
        return Response.json(
            {
                success: true,
                message: "Plan created"
            },
            {
                status: 200
            }
        )
       }


    } catch (error) {
        console.error('Error creating Plan',error);
        return Response.json(
            {
                success: false,
                message: "Error creating Plan"
            },
            {
                status: 500
            }
        )
    }
}

export async function GET(request: Request) {
    await dbConnect();

    try {
        const plans = await PlanModel.find({});
        return new Response(
            JSON.stringify({
                success: true,
                data: plans
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error fetching plans', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error fetching plans"
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



export async function PUT(request: Request) {
    await dbConnect();

    try {
        const { id, ...updates } = await request.json();

        // Find the plan by its ID
        const existingPlan = await PlanModel.findById(id);

        // If the plan doesn't exist, return an error response
        if (!existingPlan) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Plan not found"
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
        Object.assign(existingPlan, updates);

        // Save the updated plan
        await existingPlan.save();

        // Return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Plan updated successfully"
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating plan', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error updating plan"
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
        const deletedPlan = await PlanModel.findByIdAndDelete(id);

        // If the plan doesn't exist, return an error response
        if (!deletedPlan) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Plan not found"
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
                message: "Plan deleted successfully"
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error deleting plan', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error deleting plan"
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
