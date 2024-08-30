import dbConnect from "@/lib/dbConnect";
import CandidateModel from "@/model/Candidate";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            internalHr,
            companyName,
            plan,
            firstName,
            lastName,
            email,
            // contactNumber,
            // ssnId,
            status
        } = await request.json();

        // Check if candidate with the provided email already exists
        const existingCandidateByEmail = await CandidateModel.findOne({ email });

        if (existingCandidateByEmail) {
            return Response.json({
                success: false,
                message: "Candidate with the email already exists"
            }, {
                status: 400
            });
        } else {
            // Create a new candidate document
            const newCandidate = new CandidateModel({
                internalHr,
                companyName,
                plan,
                firstName,
                lastName,
                email,
                // contactNumber,
                // ssnId,
                status
            });

            // Save the new candidate document to the database
           const candidate= await newCandidate.save();

            return Response.json({
                success: true,
                message: "Candidate created",
                candidate:candidate,
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.error('Error creating candidate:', error);
        return Response.json({
            success: false,
            message: "Error creating candidate"
        }, {
            status: 500
        });
    }
}
