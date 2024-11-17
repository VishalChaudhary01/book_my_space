import prisma from '.';
import bcrypt from 'bcrypt';

const users = [
     { id: '1', name: 'Alice', email: 'alice@example.com', password: '444444', },
     { id: '2', name: 'Bob', email: 'bob@example.com', password: '666666' },
];

const rooms = [
     {
          id: '11',
         ownerId: '1',
         address: 'Jankipuram',
         city: 'Lucknow',
         description: 'Auditorium/conference/seminar hall booking',
         image: 'bookit/lneh6n7zhy5yoymxzuzr',
         lengthInFeet: 800,
         name: 'Auditorium/conference/seminar hall booking',
         pin: 226021,
         pricePerDay: 4000,
         pricePerHour: 600,
         pricePerMonth: 45000,
         state: 'Uttar Pradesh',
         widthInFeet: 599
     },
     {
          id: '12',
         ownerId: '1',
         address: 'Hazratganj',
         city: 'Lucknow',
         description: 'This seminal hall has capacity of 100 people.',
         image: 'bookit/msgs9qvwkjzg2vsirsh0',
         lengthInFeet: 500,
         name: 'Luxury Room',
         pin: 226001,
         pricePerDay: 3000,
         pricePerHour: 500,
         pricePerMonth: 35000,
         state: 'Uttar Pradesh',
         widthInFeet: 400
     },
     {
          id: '13',
         ownerId: '1',
         address: 'Gomti Nagar',
         city: 'Lucknow',
         description: 'Fully furnished meeting room',
         image: 'bookit/usg8lixnuq3e3pvdraa9',
         lengthInFeet: 300,
         name: 'Meeting Room',
         pin: 226010,
         pricePerDay: 2000,
         pricePerHour: 300,
         pricePerMonth: 25000,
         state: 'Uttar Pradesh',
         widthInFeet: 200
     },
     {
          id: '14',
         ownerId: '2',
         address: 'Indira Nagar',
         city: 'Lucknow',
         description: 'This lab have 50 coputers with wifi connection.',
         image: 'bookit/lfswtuzazezh4v13zn9t',
         lengthInFeet: 1000,
         name: 'Computer lab',
         pin: 226016,
         pricePerDay: 5000,
         pricePerHour: 700,
         pricePerMonth: 55000,
         state: 'Uttar Pradesh',
         widthInFeet: 800
     }
];
 
async function seedUser() {
     try {
          for (const user of users) {
               const newUser = await prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: {
                         id: user.id,
                         email: user.email,
                         name: user.name,
                         password: await bcrypt.hash(user.password, 10),
                         isVerified: true,
                         emailVerified: new Date(),
                    },
               });
               console.log({ email: newUser.email, password: user.password });
          }
          console.log('✅ User seed completed');
     } catch (error) {
          console.error('Error seeding users:', error);
     }
}

async function seedRooms() {
     try {
          for (const room of rooms) {
               await prisma.room.upsert({
                    where: { id: room.id },
                    update: {},
                    create: { ...room },
               })
          }
          console.log('✅ Room seed completed');
     } catch (error) {
          console.error('Error seeding rooms:', error);
     }
}

async function main() {
    await seedUser();
    await seedRooms();
}

main();