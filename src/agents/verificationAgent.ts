import { getCustomerById } from '@/data/mockData';

export interface VerificationResult {
  success: boolean;
  message: string;
  kycVerified: boolean;
}

export const verificationAgent = {
  verifyKYC: (customerId: string): VerificationResult => {
    const customer = getCustomerById(customerId);
    
    if (!customer) {
      return {
        success: false,
        message: "❌ Customer not found in our records. Please contact support.",
        kycVerified: false
      };
    }

    // Simulate KYC verification
    const kycDetails = `🔍 **KYC Verification Complete**\n\n` +
      `✅ Name: ${customer.name}\n` +
      `✅ Phone: ${customer.phone}\n` +
      `✅ Address: ${customer.address}\n` +
      `✅ Employment: ${customer.employment}\n` +
      `✅ Monthly Income: ₹${customer.monthly_salary.toLocaleString('en-IN')}\n\n` +
      `All details verified successfully! Proceeding to credit assessment...`;

    return {
      success: true,
      message: kycDetails,
      kycVerified: true
    };
  },

  getVerificationStatus: (): string => {
    return "🔄 Verifying your KYC details from our CRM database...";
  }
};
