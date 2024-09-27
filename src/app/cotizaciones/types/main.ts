import { CotizacionStatus } from "prisma/prisma-client";

export interface CotizacionEnd {
  id: number;
  name: string;
  code: string;
  status: CotizacionStatus;
}
