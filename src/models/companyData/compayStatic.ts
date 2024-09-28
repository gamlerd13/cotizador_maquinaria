export interface CompanyData {
  companyName: string;
  location: string;
  ruc: number;
  phoneNumber: string[] | null;
  email: string[] | null;
}

export interface BankAccount {
  id: number;
  bankName: string;
  accounts: {
    name: string;
    currencySymbol: string;
    creditCardnumber: string;
  }[];
}
