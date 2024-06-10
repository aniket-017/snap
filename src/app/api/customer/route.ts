import dbConnect from "@/lib/dbConnect";
import CustomerModel from '@/model/Customer';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, contract_id, cost_rate } = await request.json();
        console.log({name, email, contract_id, cost_rate});
        

        const existingCustomerByEmail = await CustomerModel.findOne({ email });
        const existingCustomerByContractId = await CustomerModel.findOne({ contract_id });

        if (existingCustomerByEmail) {
            return new Response(JSON.stringify({
                success: false,
                message: "Customer with the email already exists"
            }), {
                status: 400
            });
        } else if (existingCustomerByContractId) {
            return new Response(JSON.stringify({
                success: false,
                message: "Customer with the contract ID already exists"
            }), {
                status: 400
            });
        } else {
            const newCustomer = new CustomerModel({
                name,
                email,
                contract_id,
                cost_rate
            });

            const customer = await newCustomer.save();

            return new Response(JSON.stringify({
                success: true,
                message: "Customer created",
                customer
            }), {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error registering customer', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error registering customer"
        }), {
            status: 500
        });
    }
}


export async function GET(request: Request) {
    await dbConnect();

    try {
        const customers = await CustomerModel.find({});
        return new Response(
            JSON.stringify({
                success: true,
                data: customers
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error fetching customers', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error fetching customers"
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

        // Find the existing customer by ID
        const existingCustomer = await CustomerModel.findById(id);

        if (!existingCustomer) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Customer not found"
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        // Update the customer with the new data
        Object.assign(existingCustomer, updates);

        const updatedCustomer = await existingCustomer.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Customer updated",
                customer: updatedCustomer
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error updating customer', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error updating customer"
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

        // Find the customer by id and delete them
        const deletedCustomer = await CustomerModel.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Customer not found"
                }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Customer deleted",
                customer: deletedCustomer
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error deleting customer', error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error deleting customer"
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