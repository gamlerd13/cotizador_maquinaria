import { PrismaClient } from "@prisma/client";

import { hash } from "bcrypt-ts";
import { clients } from "./seedClients.mjs";
import { items } from "./seedITems.mjs";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: "admin",
  },
  {
    username: "kedevs",
    email: "kedevs@example.com",
    password: "kedevs",
  },
];

async function main() {
  const userDB = await prisma.user.count();
  if (userDB != 0) return console.log("Ya tiene usuario creado");

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

  const client = await prisma.client.createMany({
    data: clients,
    skipDuplicates: true,
  });

  const item = await prisma.item.createMany({
    data: items,
    skipDuplicates: true,
  });

  console.log({ user }, { client }, { item });
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
