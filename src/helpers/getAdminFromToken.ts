import { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export const getAdminFromToken =(request: NextRequest) => {

    try {
        const encodedToken=request.cookies.get("admin_token")?.value || '';
        console.log("encodedToken",encodedToken);
        
        const decodedToken:any = jwt.verify(encodedToken,process.env.TOKEN_SECRET!);
        console.log("decodedToken",decodedToken);
        return decodedToken.tokenData;
    } catch (error: any) {
        throw new Error(error.message);
        
    }
}