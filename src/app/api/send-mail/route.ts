import {NextRequest, NextResponse} from 'next/server';
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {

    const { to, subject, text } = await request.json();
    console.log("to",to);
    
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USERNAME!, 
                pass: process.env.EMAIL_PASSWORD! 
            }
        });

        try {
            // Send mail
            await transporter.sendMail({
                from: process.env.EMAIL_USERNAME!,
                to,
                subject,
                text
            });
            return NextResponse.json({
                message:"Email sent successfully",
            }, {
                status: 200
            });
    }
    catch (error) {
        console.error('Error sending mail:', error);
        return Response.json({
            success: false,
            message: "Error sending mail"
        }, {
            status: 500
        });
    }
}