import dbConnect from "@/lib/dbConnect";
import CandidateModel from "@/model/Candidate";
import { parseStringPromise } from 'xml2js';

export async function POST(request: Request) {
    await dbConnect();
    console.log("here");

    try {
        const {
            internalHr,
            companyName,
            plan, // Same as package
            firstName,
            lastName,
            email,
            status
        } = await request.json();
        

        console.log(companyName);

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
                status
            });

            // Save the new candidate document to the database
            const candidate = await newCandidate.save();

            // Prepare XML data
            const xmlData = `<Accio_Order>
                <mode>DRAFT</mode>
                <login>
                    <account>AG0000</account>
                    <username>PrashantP</username>
                    <password>Snapcheck@2024</password>
                </login>
                <placeOrder>
                    <IncludeDefaultProducts/>
                    <Cancel_out_of_scope_elements/>
                    <orderInfo>
                        <requester_name use_default="Y"/>
                        <requester_phone use_default="Y"/>
                        <requester_fax use_default="Y"/>
                        <requester_email use_default="Y"/>
                    </orderInfo>
                    <package>${plan}</package>
                    <subject>
                        <name_first>${firstName}</name_first>
                        <name_last>${lastName}</name_last>
                        <email>${email}</email>
                    </subject>
                    <subOrder type="add2crim7yr" />
        <subOrder type="AIM"  />
        <subOrder type="Credit"  />
        <subOrder type="National Criminal"  />
        <subOrder type="CDL_Employment_verification">
            <company_name></company_name>
            <position></position>
            <contact></contact>
            <phone_number></phone_number>
            <phone_extension></phone_extension>
            <start_date></start_date>
            <end_date></end_date>
            <income></income>
            <income_type></income_type>
            <address1></address1>
            <address2></address2>
            <city></city>
            <state></state>
            <zip></zip>
            <reason_for_leaving></reason_for_leaving>
            <comments></comments>
        </subOrder>
        <subOrder type="Civil_County_criminal_lower">
            <county></county>
            <state></state>
            <years_conviction></years_conviction>
            <years_nonconviction></years_nonconviction>
            <notes_to_supplier></notes_to_supplier>
        </subOrder>
        <subOrder type="Civil_County_criminal_upper" >
            <county></county>
            <state></state>
            <years_conviction></years_conviction>
            <years_nonconviction></years_nonconviction>
            <notes_to_supplier></notes_to_supplier>
        </subOrder>
        <subOrder type="County_criminal">
            <county></county>
            <state></state>
            <years_conviction></years_conviction>
            <years_nonconviction></years_nonconviction>
            <searchtype></searchtype>
            <notes_to_supplier></notes_to_supplier>
        </subOrder>
        <subOrder type="Credential_verification">
            <description></description>
            <license_number></license_number>
            <state></state>
            <organization_name></organization_name>
            <date_received></date_received>
            <expiration_date></expiration_date>
            <comments></comments>
        </subOrder>
        <subOrder type="Education_verification" >
            <school_name></school_name>
            <address1></address1>
            <address2></address2>
            <city></city>
            <state></state>
            <zip></zip>
            <degree></degree>
            <levelCompleted></levelCompleted>
            <graduation_date></graduation_date>
            <major></major>
            <GPA></GPA>
            <attended_from></attended_from>
            <attended_to></attended_to>
            <transcript></transcript>
            <graduated></graduated>
            <comments></comments>
        </subOrder>
        <subOrder type="Employment_verification">
            <company_name></company_name>
            <address1></address1>
            <city></city>
            <state></state>
            <zip></zip>
            <phone_number></phone_number>
            <position></position>
            <end_date></end_date>
            <contact></contact>
            <contact_current_employer></contact_current_employer>
            <phone_extension></phone_extension>
            <start_date></start_date>
            <end_date></end_date>
            <income></income>
            <income_type></income_type>
            <address2></address2>
            <reason_for_leaving></reason_for_leaving>
            <is_alternate></is_alternate>
            <comments></comments>
        </subOrder>
                </placeOrder>
            </Accio_Order>`;

            // Send the XML request to the external API
            const response = await fetch('https://orders.snapcheck.ai/c/p/researcherxml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body: xmlData
            });

            

            const apiResponseText = await response.text();
            console.log("Raw XML Response:", apiResponseText);
             // Parse XML to JavaScript object using xml2js
             const parsedResponse = await parseStringPromise(apiResponseText);

             console.log("Parsed Response:", parsedResponse);


            // Handle the response from the external API
            if (!response.ok) {
                return Response.json({
                    success: false,
                    message: "Error sending data to external API"
                }, {
                    status: response.status
                });
            }

            // const apiResponseText = await response.text();

            return Response.json({
                success: true,
                message: "Candidate created and data sent to external API",
                candidate: candidate,
                externalApiResponse: apiResponseText
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
