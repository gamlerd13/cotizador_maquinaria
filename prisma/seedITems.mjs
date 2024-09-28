import { PrismaClient, UnitOfMeasure } from "@prisma/client";
const prisma = new PrismaClient();

export const items = [
  {
    name: "Sugar",
    brand: "SweetCo",
    description: "Refined white sugar",
    comment: "Popular choice for baking",
    manufactureCode: "SUG-001",
    weight: 1.0,
    unitPrice: 1.5,
    code: "PRD001",
    unitMeasure: UnitOfMeasure.KILOGRAM,
  },
  {
    name: "Olive Oil",
    brand: "Olivia's",
    description: "Extra virgin olive oil",
    comment: "Cold pressed",
    manufactureCode: "OLI-002",
    weight: 0.5,
    unitPrice: 6.0,
    code: "PRD002",
    unitMeasure: UnitOfMeasure.LITER,
  },
  {
    name: "Rice",
    brand: "GrainGood",
    description: "Long grain white rice",
    comment: "Gluten-free",
    manufactureCode: "RIC-003",
    weight: 5.0,
    unitPrice: 4.5,
    code: "PRD003",
    unitMeasure: UnitOfMeasure.KILOGRAM,
  },
  {
    name: "Tomato Sauce",
    brand: "Saucy",
    description: "Rich tomato sauce",
    comment: "Perfect for pasta",
    manufactureCode: "TOM-004",
    weight: 0.75,
    unitPrice: 2.0,
    code: "PRD004",
    unitMeasure: UnitOfMeasure.LITER,
  },
  {
    name: "Flour",
    brand: "BakeWell",
    description: "All-purpose flour",
    comment: "Ideal for baking",
    manufactureCode: "FLR-005",
    weight: 2.0,
    unitPrice: 1.8,
    code: "PRD005",
    unitMeasure: UnitOfMeasure.KILOGRAM,
  },
  {
    name: "Milk",
    brand: "DairyPure",
    description: "Whole milk",
    comment: "Organic, fresh",
    manufactureCode: "MLK-006",
    weight: 1.0,
    unitPrice: 1.2,
    code: "PRD006",
    unitMeasure: UnitOfMeasure.LITER,
  },
  {
    name: "Shampoo",
    brand: "HairCare",
    description: "Moisturizing shampoo",
    comment: "Infused with aloe vera",
    manufactureCode: "SHA-007",
    weight: 0.3,
    unitPrice: 3.5,
    code: "PRD007",
    unitMeasure: UnitOfMeasure.LITER,
  },
  {
    name: "Pasta",
    brand: "PastaMania",
    description: "Spaghetti pasta",
    comment: "Italian style",
    manufactureCode: "PAS-008",
    weight: 0.5,
    unitPrice: 1.0,
    code: "PRD008",
    unitMeasure: UnitOfMeasure.KILOGRAM,
  },
  {
    name: "Cereal",
    brand: "CrunchyOats",
    description: "Oat-based cereal",
    comment: "High fiber content",
    manufactureCode: "CER-009",
    weight: 0.4,
    unitPrice: 2.5,
    code: "PRD009",
    unitMeasure: UnitOfMeasure.KILOGRAM,
  },
  {
    name: "Juice",
    brand: "FreshSqueeze",
    description: "Orange juice, no pulp",
    comment: "100% natural",
    manufactureCode: "JUI-010",
    weight: 1.5,
    unitPrice: 3.0,
    code: "PRD010",
    unitMeasure: UnitOfMeasure.LITER,
  },
];

async function main() {
  const item = await prisma.item.createMany({
    data: items,
    skipDuplicates: true,
  });

  console.log(item);
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
