import { NextResponse, NextRequest } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import basicFederalModel from "@/model/BasicFederalForm";

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

        const newBasicFederalForm = new basicFederalModel({
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

        const basicFederalForm = await newBasicFederalForm.save();
        return NextResponse.json(
            {
                success: true,
                message: "Basic Federal Form created",
                basicForm: basicFederalForm,
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error('Error creating Basic Federal Form', error);
        return NextResponse.json(
            {
                success: false,
                message: "Error creating Basic Federal Form"
            },
            {
                status: 500
            }
        );
    }
}
