// test.ts
console.log("🔧 Running Prisma test...");

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const patients = await prisma.patient.findMany();
  // console.log('📋 All patients:', patients);
  if (patients.length === 0) {
  console.log("⚠️ No patients found in the database.");
} else {
  console.log('📋 Patients:', patients);
}

}

main()
  .catch((e) => {
    console.error('❌ ERROR:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
