import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Örnek müvekkiller ekle
  const client1 = await prisma.client.create({
    data: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0532 123 4567',
      address: 'İstanbul, Kadıköy',
      tcNo: '12345678901'
    }
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      phone: '0533 234 5678',
      address: 'İstanbul, Beşiktaş',
      tcNo: '12345678902'
    }
  });

  // Örnek davalar ekle
  await prisma.case.create({
    data: {
      title: 'Kira Sözleşmesi İhtilafı',
      caseNumber: 'E.2024/123',
      type: 'Kira',
      status: 'ACTIVE',
      description: 'Kira bedelinin ödenmemesi',
      clientId: client1.id,
      hearings: {
        create: {
          date: new Date('2024-03-20'),
          location: 'İstanbul 5. Sulh Hukuk Mahkemesi',
          notes: 'İlk duruşma'
        }
      }
    }
  });

  await prisma.case.create({
    data: {
      title: 'Boşanma Davası',
      caseNumber: 'E.2024/456',
      type: 'Boşanma',
      status: 'ACTIVE',
      description: 'Anlaşmalı boşanma',
      clientId: client2.id
    }
  });

  // Örnek faturalar ekle
  await prisma.invoice.create({
    data: {
      amount: 25000,
      status: 'PAID',
      dueDate: new Date('2024-01-15'),
      clientId: client1.id
    }
  });

  await prisma.invoice.create({
    data: {
      amount: 35000,
      status: 'PENDING',
      dueDate: new Date('2024-02-15'),
      clientId: client2.id
    }
  });

  console.log('Seed data eklendi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
