export type User = {
  _id: string;
  name: string; // Changed from companyName to name
  email: string;
  contract_id: string; // Changed from contractId to contract_id
  cost_rate: number; // Changed from costRate to cost_rate
};

export const users: User[] = [
  {
    _id: '1',
    name: 'Dell',
    email: 'test@gmail.com',
    contract_id: '389621',
    cost_rate: 0
  },
  {
    _id: '2',
    name: 'Dell',
    email: 'test@gmail.com',
    contract_id: '389621',
    cost_rate: 0
  },
  {
    _id: '3',
    name: 'Zealits',
    email: 'test@gmail.com',
    contract_id: '389621',
    cost_rate: 0
  },
  {
    _id: '4',
    name: 'Dell',
    email: 'test@gmail.com',
    contract_id: '389621',
    cost_rate: 0
  },
  {
    _id: '5',
    name: 'Dell',
    email: 'test@gmail.com',
    contract_id: '389621',
    cost_rate: 0
  },
  // Add the rest of the user objects...
];

export type Employee = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};
