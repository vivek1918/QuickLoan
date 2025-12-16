import { getCustomerById } from '@/data/mockData';
import { LoanApplication } from './types';

export const salesAgent = {
  greet: (customerId: string): string => {
    const customer = getCustomerById(customerId);
    if (!customer) return "Hello! I'm your personal loan assistant. How can I help you today?";
    
    return `Hello ${customer.name}! 👋 Welcome to QuickLoan NBFC!\n\nI'm your personal loan assistant, here to help you get the best personal loan offer.\n\nWould you like to explore a personal loan today? We offer:\n• Competitive interest rates starting at 10.5%\n• Flexible tenures from 12 to 60 months\n• Quick approval within minutes!\n\nHow much loan amount are you looking for?`;
  },

  askLoanAmount: (): string => {
    return "Great! Let's get started. What loan amount are you looking for? (Please enter amount between ₹50,000 to ₹20,00,000)";
  },

  validateLoanAmount: (amount: number): { valid: boolean; message: string } => {
    if (amount < 50000) {
      return { valid: false, message: "The minimum loan amount is ₹50,000. Please enter a higher amount." };
    }
    if (amount > 2000000) {
      return { valid: false, message: "The maximum loan amount is ₹20,00,000. Please enter a lower amount." };
    }
    return { valid: true, message: `Excellent choice! ₹${amount.toLocaleString('en-IN')} is a great amount to start with.` };
  },

  askTenure: (amount: number): string => {
    return `Perfect! You've selected a loan amount of ₹${amount.toLocaleString('en-IN')}.\n\nNow, what tenure would you prefer?\n• 12 months - Higher EMI, Lower Interest\n• 24 months - Balanced Option\n• 36 months - Moderate EMI\n• 48 months - Lower EMI\n• 60 months - Lowest EMI, Higher Interest\n\nPlease enter tenure in months (12-60):`;
  },

  validateTenure: (tenure: number): { valid: boolean; message: string } => {
    if (tenure < 12) {
      return { valid: false, message: "Minimum tenure is 12 months. Please enter a valid tenure." };
    }
    if (tenure > 60) {
      return { valid: false, message: "Maximum tenure is 60 months. Please enter a valid tenure." };
    }
    return { valid: true, message: "Great choice!" };
  },

  calculateEMI: (principal: number, tenure: number, rate: number = 11.5): { emi: number; totalInterest: number; totalAmount: number } => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  },

  showEMIDetails: (application: LoanApplication): string => {
    const { loanAmount, tenure, emi, interestRate } = application;
    const { totalInterest, totalAmount } = salesAgent.calculateEMI(loanAmount!, tenure!, interestRate);
    
    return `📊 **Your Loan Summary**\n\n` +
      `💰 Loan Amount: ₹${loanAmount!.toLocaleString('en-IN')}\n` +
      `📅 Tenure: ${tenure} months\n` +
      `📈 Interest Rate: ${interestRate}% p.a.\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `💵 **Monthly EMI: ₹${emi!.toLocaleString('en-IN')}**\n` +
      `📊 Total Interest: ₹${totalInterest.toLocaleString('en-IN')}\n` +
      `📋 Total Payable: ₹${totalAmount.toLocaleString('en-IN')}\n\n` +
      `This looks like a great plan! Shall I proceed with the verification? (Type "yes" to continue)`;
  }
};
