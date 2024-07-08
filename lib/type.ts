export type CustomerCache = {
    states: Field[],
    cities: Field[],
    neighboorhoods: Field[],
    banks: Field[],
    affilietes: Field[],
    payrolls: Field[],
}

type Field = {
    id: number,
    name: string
}
// TypeScript types generated from Prisma models

export type Customer = {
    customer_id: number;
    user_id: number;
    name: string;
    last_name: string;
    phone_number: string;
    neighborhood_id: number;
    address: string;
    payroll_id: number;
    bank_id: number;
    affiliate_id: number;
    created: Date;
    reference_contacts: ReferenceContact[];
    banks: Bank;
    affiliates: Affiliate;
    payrolls: Payroll;
    neighborhoods: Neighborhood;
    credits: Credit[];
  };
  
  export type ReferenceContact = {
    reference_contact_id: number;
    customer_id: number;
    name: string;
    last_name: string;
    phone_number: string;
    created: Date;
  };
  
  export type Bank = {
    bank_id: number;
    name: string;
    activated?: boolean;
    customers: Customer[];
  };
  
  export type Affiliate = {
    affiliate_id: number;
    name: string;
    activated?: boolean;
    customers: Customer[];
  };
  
  export type Payroll = {
    payroll_id: number;
    name: string;
    activated?: boolean;
    customers: Customer[];
  };
  
  export type Neighborhood = {
    neighborhood_id: number;
    city_id: number;
    name: string;
    zipcode: string;
    customers: Customer[];
    cities: City;
  };
  
  export type Credit = {
    credit_id: number;
    customer_id?: number;
    lapse: number;
    amount: number;
    rate: number;
    auth_date?: Date;
    auth_code?: string;
    start_date: Date;
    end_date: Date;
    created?: Date;
    customers?: Customer;
  };
  
  export type City = {
    city_id: number;
    state_id: number;
    name: string;
    states: State;
    neighborhoods: Neighborhood[];
  };
  
  export type State = {
    state_id: number;
    code: string;
    name: string;
    cities: City[];
  };
  
  export type User = {
    user_id: number;
    name: string;
    password: string;
    active?: boolean;
    customers: Customer[];
  };
  