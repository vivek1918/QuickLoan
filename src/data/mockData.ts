// Mock CRM Dataset
export interface Customer {
  customer_id: string;
  phone: string;
  name: string;
  address: string;
  employment: string;
  monthly_salary: number;
}

export const crmData: Customer[] = [
  {
    customer_id: "C001",
    phone: "9876543210",
    name: "Rahul Sharma",
    address: "Mumbai, India",
    employment: "Salaried",
    monthly_salary: 60000
  },
  {
    customer_id: "C002",
    phone: "9123456780",
    name: "Anjali Verma",
    address: "Pune, India",
    employment: "Salaried",
    monthly_salary: 45000
  },
  {
    customer_id: "C003",
    phone: "9988776655",
    name: "Rohit Mehta",
    address: "Ahmedabad, India",
    employment: "Self-Employed",
    monthly_salary: 80000
  },
  {
    customer_id: "C004",
    phone: "9012345678",
    name: "Sneha Iyer",
    address: "Chennai, India",
    employment: "Salaried",
    monthly_salary: 35000
  },
  {
    customer_id: "C005",
    phone: "8899776655",
    name: "Amit Patel",
    address: "Surat, India",
    employment: "Business",
    monthly_salary: 100000
  },
  {
    customer_id: "C006",
    phone: "7766554433",
    name: "Neha Kapoor",
    address: "Delhi, India",
    employment: "Salaried",
    monthly_salary: 55000
  }
];

// Mock Credit Bureau Dataset
export interface CreditBureauData {
  customer_id: string;
  credit_score: number;
  pre_approved_limit: number;
  existing_loans: number;
  payment_history: string;
}

export const creditBureauData: CreditBureauData[] = [
  {
    customer_id: "C001",
    credit_score: 750,
    pre_approved_limit: 300000,
    existing_loans: 1,
    payment_history: "Excellent"
  },
  {
    customer_id: "C002",
    credit_score: 680,
    pre_approved_limit: 150000,
    existing_loans: 2,
    payment_history: "Good"
  },
  {
    customer_id: "C003",
    credit_score: 810,
    pre_approved_limit: 500000,
    existing_loans: 0,
    payment_history: "Excellent"
  },
  {
    customer_id: "C004",
    credit_score: 620,
    pre_approved_limit: 100000,
    existing_loans: 3,
    payment_history: "Fair"
  },
  {
    customer_id: "C005",
    credit_score: 780,
    pre_approved_limit: 600000,
    existing_loans: 1,
    payment_history: "Excellent"
  },
  {
    customer_id: "C006",
    credit_score: 720,
    pre_approved_limit: 250000,
    existing_loans: 1,
    payment_history: "Good"
  }
];

export const getCustomerById = (id: string): Customer | undefined => {
  return crmData.find(c => c.customer_id === id);
};

export const getCreditDataById = (id: string): CreditBureauData | undefined => {
  return creditBureauData.find(c => c.customer_id === id);
};
