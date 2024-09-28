import { PrismaClient, UnitOfMeasure } from "@prisma/client";
const prisma = new PrismaClient();

export const clients = [
  {
    name: "Juan Pérez",
    contact: "juan.perez@example.com",
    ruc: "20123456789",
    reference: "Cliente preferencial",
  },
  {
    name: "María Rodríguez",
    contact: "maria.rodriguez@example.com",
    ruc: "20234567890",
    reference: "Proveedor internacional",
  },
  {
    name: "Carlos García",
    contact: "carlos.garcia@example.com",
    ruc: "20345678901",
    reference: "Cliente recurrente",
  },
  {
    name: "Ana González",
    contact: "ana.gonzalez@example.com",
    ruc: "20456789012",
    reference: "Contacto comercial",
  },
  {
    name: "Pedro Fernández",
    contact: "pedro.fernandez@example.com",
    ruc: "20567890123",
    reference: "Proveedor nacional",
  },
  {
    name: "Lucía Martínez",
    contact: "lucia.martinez@example.com",
    ruc: "20678901234",
    reference: "Cliente nuevo",
  },
  {
    name: "Javier López",
    contact: "javier.lopez@example.com",
    ruc: "20789012345",
    reference: "Cliente frecuente",
  },
  {
    name: "Sofía Ramírez",
    contact: "sofia.ramirez@example.com",
    ruc: "20890123456",
    reference: "Distribuidor local",
  },
  {
    name: "Miguel Torres",
    contact: "miguel.torres@example.com",
    ruc: "20901234567",
    reference: "Proveedor externo",
  },
  {
    name: "Elena Sánchez",
    contact: "elena.sanchez@example.com",
    ruc: "20134567892",
    reference: "Cliente esporádico",
  },
];

async function main() {
  const client = await prisma.client.createMany({
    data: clients,
    skipDuplicates: true,
  });

  console.log(client);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
