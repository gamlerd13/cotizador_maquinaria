import { BankAccount, ClientData } from "@/models/companyData/compayStatic";

export const clientData: ClientData = {
  companyName: "VORAZ DEL PERU SAC",
  location: "AV.MARISCAL NIETO N°326, URB.",
  ruc: 20498189394,
  phoneNumber: null,
  email: null,
};

export const bankAccounts: BankAccount[] = [
  {
    name: "BBVA SOLES",
    currencySymbol: "S/.",
    creditCardnumber: "0011-0226-0100007885-85",
  },
  {
    name: "BBVA DOLARES",
    currencySymbol: "$/.",
    creditCardnumber: "0011-0226-0100007877-82",
  },
  {
    name: "BCP SOLES",
    currencySymbol: "S/.",

    creditCardnumber: "215-2528208-0-70",
  },
  {
    name: "BCP DOLARES",
    currencySymbol: "$/.",

    creditCardnumber: "215-2481537-1-55",
  },
];
