import { BankAccount, CompanyData } from "@/models/companyData/compayStatic";

export const companyData: CompanyData = {
  companyName: "ADIEL S.J.",
  companyNameLong: "ADIEL S.J. PARTS SOLUTIONS S.A.C",
  location: "JR. MIRAMAR MZA. C LOTE. S/N MOQUEGUA - ILO - ILO",
  ruc: 20613144731,
  phoneNumber: null,
  email: null,
};

export const bankAccounts: BankAccount[] = [
  // {
  //   id: 2,
  //   bankName: "BBVA",
  //   accounts: [
  //     {
  //       name: "BBVA SOLES",
  //       currencySymbol: "S/.",
  //       creditCardnumber: "",
  //     },
  //     {
  //       name: "BBVA DOLARES",
  //       currencySymbol: "$/.",
  //       creditCardnumber: "",
  //     },
  //   ],
  // },
  {
    id: 1,
    bankName: "BCP",
    accounts: [
      {
        name: "BCP SOLES",
        currencySymbol: "S/.",

        creditCardnumber: "3857066249038",
      },
      {
        name: "BCP SOLES CCI",
        currencySymbol: "S/.",

        creditCardnumber: "00238500706624903835",
      },
    ],
  },
];
