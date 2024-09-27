import { PrismaClient } from "@prisma/client";

import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin",
  },
  {
    username: "Alice Smith",
    email: "alice.smith@example.com",
    password: "555-1234",
  },
];

const subs = [
  {
    fullname: "Eduardo Jimenez",
    email: "eduardo.jimenez@example.com",
    phone: "+5112345679",
    endDate: "2024-10-05T00:00:00Z",
    status: "ACTIVE",
    description: "Subscription to webinar platform.",
  },
];

async function main() {
  const listUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hash(user.password, 10),
    }))
  );

  const user = await prisma.user.createMany({
    data: listUsers,
    skipDuplicates: true,
  });

  console.log(user);
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
