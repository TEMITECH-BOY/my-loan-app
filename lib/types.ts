// Type definitions for the loan app

export interface Loan {
  id: string;
  amount: number;
  duration_months: number;
  interest_rate: number;
  status: "pending" | "approved" | "rejected" | "active" | "completed";
  requested_at: Date;
  approved_at: Date | null;
  created_at?: Date;
}

export interface LoanApplication {
  id: string;
  user_id: string;
  loan_id: string;
  employment_status: string;
  annual_income: number;
  employment_years: number;
  reason: string;
  submitted_at: Date;
  status: "submitted" | "under_review" | "approved" | "rejected";
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  document_id?: string;
  created_at: Date;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
