import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const existingPerson = await prisma.people.findUnique({
    where: { document: '1577993741' },
  });

  if (!existingPerson) {
    await prisma.people.create({
      data: {
        document: '1577993741',
        name: 'Test User',
        password: 'strongpassword',
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
