import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import basicModel from "@/model/BasicForm";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const {
            candidate,
            firstName,
            middleName,
            lastName,
            nametype,
            dob,
            passportNumber,
            passportType,
            passportCountry,
            ssn,
            address,
            city,
            state,
            zip,
            jobCity,
            jobState,
            jobZip,
            positionTitle,
            applicantPhone,
            applicantEmail,
            race,
            gender,
            dlCountry,
            dlNumber,
            dlState,
            citizenship,
            motherMaidenName,
            motherFullName,
            fatherName,
            cityOfBirth,
            countryOfBirth,
            fcraPurpose,
            statedMonthlyIncome,
            proposedMonthlyRent,
            knownCriminalRecords,
            criminalRecordDescription
        } = await request.json();

        const newBasicForm = new basicModel({
            candidate,
            firstName,
            middleName,
            lastName,
            nametype,
            dob,
            passportNumber,
            passportType,
            passportCountry,
            ssn,
            address,
            city,
            state,
            zip,
            jobCity,
            jobState,
            jobZip,
            positionTitle,
            applicantPhone,
            applicantEmail,
            race,
            gender,
            dlCountry,
            dlNumber,
            dlState,
            citizenship,
            motherMaidenName,
            motherFullName,
            fatherName,
            cityOfBirth,
            countryOfBirth,
            fcraPurpose,
            statedMonthlyIncome,
            proposedMonthlyRent,
            knownCriminalRecords,
            criminalRecordDescription
        });

        const basicForm = await newBasicForm.save();
        return NextResponse.json(
            {
                success: true,
                message: "Basic Form created",
                basicForm: basicForm,
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error('Error creating Basic Form', error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating Basic Form"
            },
            {
                status: 500
            }
        );
    }
}
