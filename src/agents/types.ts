export type AgentType = 'master' | 'sales' | 'verification' | 'underwriting' | 'sanction';

export type ConversationState = 
  | 'greeting'
  | 'collecting_loan_amount'
  | 'collecting_tenure'
  | 'showing_emi'
  | 'verifying_kyc'
  | 'underwriting'
  | 'salary_slip_required'
  | 'waiting_salary_slip'
  | 'approved'
  | 'rejected'
  | 'sanction_generated';

export interface LoanApplication {
  customerId: string;
  loanAmount?: number;
  tenure?: number;
  emi?: number;
  interestRate?: number;
  salarySlipUploaded?: boolean;
  extractedSalary?: number;
  status?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  sanctionLetterId?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: AgentType;
  showFileUpload?: boolean;
  showDownload?: boolean;
  sanctionLetterId?: string;
}

export interface AgentContext {
  customerId: string;
  state: ConversationState;
  application: LoanApplication;
  messages: Message[];
}
