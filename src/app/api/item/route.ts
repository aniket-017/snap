import dbConnect from "@/lib/dbConnect";
import ProductTemplateModel from "@/model/Product";

export async function POST(request: Request){
    await dbConnect()

    try {
       const {productName,productPrice}= await request.json()
       const existingUserByEmail= await ProductTemplateModel.findOne({
        productName
       })
       
       if (existingUserByEmail) {
        return Response.json(
            {
                success: false,
                message: "product already exist"
            },
            {
                status: 400
            }
        )  
       }else{
        const newProduct =new ProductTemplateModel({
            productName: productName,
            productPrice:productPrice,
        })

        await newProduct.save()
        return Response.json(
            {
                success: true,
                message: "Product created"
            },
            {
                status: 200
            }
        )
       }


    } catch (error) {
        console.error('Error registering product',error);
        return Response.json(
            {
                success: false,
                message: "Error registering product"
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
        const products = await ProductTemplateModel.find({});
        return new Response(
            JSON.stringify({
                success: true,
                data: products
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    } catch (error) {
        console.error('Error fetching products', error);
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