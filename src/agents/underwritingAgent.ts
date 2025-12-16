import { getCustomerById, getCreditDataById } from '@/data/mockData';
import { LoanApplication } from './types';

export interface UnderwritingResult {
  decision: 'approved' | 'rejected' | 'salary_slip_required';
  message: string;
  reason?: string;
}

export const underwritingAgent = {
  assessCredit: (customerId: string, loanAmount: number): UnderwritingResult => {
    const customer = getCustomerById(customerId);
    const creditData = getCreditDataById(customerId);

    if (!customer || !creditData) {
      return {
        decision: 'rejected',
        message: "❌ Unable to fetch credit data. Application rejected.",
        reason: "Data not available"
      };
    }

    // Rule 1: Reject if credit score < 700
    if (creditData.credit_score < 700) {
      return {
        decision: 'rejected',
        message: `❌ **Application Declined**\n\n` +
          `Unfortunately, your current credit score (${creditData.credit_score}) does not meet our minimum requirement of 700.\n\n` +
          `📌 **Tips to improve your score:**\n` +
          `• Pay existing EMIs on time\n` +
          `• Reduce credit utilization\n` +
          `• Clear any outstanding dues\n\n` +
          `Please try again after 6 months with an improved credit profile.`,
        reason: "Low credit score"
      };
    }

    // Show credit assessment
    const creditAssessment = `📊 **Credit Assessment**\n\n` +
      `🎯 Credit Score: ${creditData.credit_score} (${creditData.payment_history})\n` +
      `💳 Pre-approved Limit: ₹${creditData.pre_approved_limit.toLocaleString('en-IN')}\n` +
      `📋 Existing Loans: ${creditData.existing_loans}\n\n`;

    // Rule 2: Approve if loan <= pre-approved limit
    if (loanAmount <= creditData.pre_approved_limit) {
      return {
        decision: 'approved',
        message: creditAssessment + 
          `✅ **Congratulations!** Your loan of ₹${loanAmount.toLocaleString('en-IN')} is within your pre-approved limit!\n\n` +
          `🎉 Your application is **APPROVED**!\n\n` +
          `Generating your sanction letter...`
      };
    }

    // Rule 3: If loan <= 2x pre-approved limit, ask for salary slip
    if (loanAmount <= creditData.pre_approved_limit * 2) {
      return {
        decision: 'salary_slip_required',
        message: creditAssessment +
          `⚠️ Your requested amount (₹${loanAmount.toLocaleString('en-IN')}) exceeds your pre-approved limit.\n\n` +
          `To process higher amounts, we need to verify your income.\n\n` +
          `📄 **Please upload your latest salary slip** for verification.`
      };
    }

    // Rule 4: Reject if loan > 2x limit
    return {
      decision: 'rejected',
      message: creditAssessment +
        `❌ **Application Declined**\n\n` +
        `Your requested amount (₹${loanAmount.toLocaleString('en-IN')}) exceeds 2x your pre-approved limit of ₹${creditData.pre_approved_limit.toLocaleString('en-IN')}.\n\n` +
        `Maximum eligible amount: ₹${(creditData.pre_approved_limit * 2).toLocaleString('en-IN')}\n\n` +
        `Would you like to apply for a lower amount?`,
      reason: "Amount exceeds eligibility"
    };
  },

  verifySalarySlip: (customerId: string, application: LoanApplication): UnderwritingResult => {
    const customer = getCustomerById(customerId);
    
    if (!customer) {
      return {
        decision: 'rejected',
        message: "❌ Error processing salary slip.",
        reason: "Customer not found"
      };
    }

    // Simulate salary extraction (using actual CRM data)
    const extractedSalary = customer.monthly_salary;
    const emi = application.emi || 0;
    const emiToSalaryRatio = (emi / extractedSalary) * 100;

    const verificationMessage = `📄 **Salary Slip Verified**\n\n` +
      `💵 Monthly Salary: ₹${extractedSalary.toLocaleString('en-IN')}\n` +
      `💳 Proposed EMI: ₹${emi.toLocaleString('en-IN')}\n` +
      `📊 EMI/Salary Ratio: ${emiToSalaryRatio.toFixed(1)}%\n\n`;

    // EMI should be <= 50% of salary
    if (emiToSalaryRatio <= 50) {
      return {
        decision: 'approved',
        message: verificationMessage +
          `✅ EMI is within 50% of your salary - **Affordable!**\n\n` +
          `🎉 Your application is **APPROVED**!\n\n` +
          `Generating your sanction letter...`
      };
    }

    return {
      decision: 'rejected',
      message: verificationMessage +
        `❌ **Application Declined**\n\n` +
        `EMI (${emiToSalaryRatio.toFixed(1)}%) exceeds 50% of your monthly salary.\n\n` +
        `This may strain your finances. Consider:\n` +
        `• Reducing the loan amount\n` +
        `• Increasing the tenure\n\n` +
        `Would you like to revise your loan application?`,
      reason: "EMI exceeds 50% of salary"
    };
  }
};
