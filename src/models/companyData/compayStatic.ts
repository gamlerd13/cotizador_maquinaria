export interface ClientData {
  companyName: string;
  location: string;
  ruc: number;
  phoneNumber: string[] | null;
  email: string[] | null;
}

export interface BankAccount {
  name: string;
  currencySymbol: string;
  creditCardnumber: string;
}
