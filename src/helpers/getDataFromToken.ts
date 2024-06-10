import { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export const getDataFromToken =(request: NextRequest) => {

    try {
        const encodedToken=request.cookies.get("internal_token")?.value || '';
        console.log("encodedToken",encodedToken);
        
        const decodedToken:any = jwt.verify(encodedToken,process.env.TOKEN_SECRET!);
        console.log("decodedToken",decodedToken);
        return decodedToken.tokenData.id;
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}