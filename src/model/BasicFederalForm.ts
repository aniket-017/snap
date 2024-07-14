import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the BasicForm model
export interface BasicFederalForm extends Document {
  candidate: mongoose.Schema.Types.ObjectId;
  firstName: string;
  middleName?: string;
  lastName: string;
  nametype?: string;
  dob: Date;
  passportNumber?: string;
  passportType?: string;
  passportCountry?: string;
  ssn?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  jobCity?: string;
  jobState?: string;
  jobZip?: string;
  positionTitle?: string;
  applicantPhone?: string;
  applicantEmail?: string;
  race?: string;
  gender?: string;
  dlCountry?: string;
  dlNumber?: string;
  dlState?: string;
  citizenship?: string;
  motherMaidenName?: string;
  motherFullName?: string;
  fatherName?: string;
  cityOfBirth?: string;
  countryOfBirth?: string;
  fcraPurpose?: string;
  statedMonthlyIncome?: string;
  proposedMonthlyRent?: string;
  knownCriminalRecords?: string;
  criminalRecordDescription?: string | null;
}

// Define the schema for the BasicForm model
const BasicFederalFormSchema: Schema<BasicFederalForm> = new Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate',required:true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  nametype: { type: String },
  dob: { type: Date, required: true },
  passportNumber: { type: String,unique:true },
  passportType: { type: String },
  passportCountry: { type: String },
  ssn: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  jobCity: { type: String },
  jobState: { type: String },
  jobZip: { type: String },
  positionTitle: { type: String },
  applicantPhone: { type: String },
  applicantEmail: { type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'] },
  race: { type: String },
  gender: { type: String },
  dlCountry: { type: String },
  dlNumber: { type: String },
  dlState: { type: String },
  citizenship: { type: String, },
  motherMaidenName: { type: String },
  motherFullName: { type: String },
  fatherName: { type: String },
  cityOfBirth: { type: String },
  countryOfBirth: { type: String },
  fcraPurpose: { type: String },
  statedMonthlyIncome: { type: String },
  proposedMonthlyRent: { type: String },
  knownCriminalRecords: { type: String,},
  criminalRecordDescription: { type: String, default: null }
}, {
  timestamps: true
});

// Create and export the BasicForm model
const BasicFederalFormModel: Model<BasicFederalForm> = mongoose.models.BasicFederalForm as Model<BasicFederalForm> || mongoose.model<BasicFederalForm>("BasicFederalForm", BasicFederalFormSchema);
export default BasicFederalFormModel;
