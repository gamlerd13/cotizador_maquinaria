import { BankAccount, CompanyData } from "@/models/companyData/compayStatic";

export const companyData: CompanyData = {
  companyName: "ADIEL S.J.",
  companyNameLong: "ADIEL S.J. PARTS SOLUTIONS S.A.C",
  location:
    "CAL.6 U NRO. 05 A.H. NUEVO AMANECER LIMA - LIMA - SAN MARTIN DE PORRES",
  ruc: 20613144731,
  phoneNumber: ["968777213", "972727164"],
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
