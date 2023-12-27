//seed script for crud ops
import {PrismaClient} from '@prisma/client';
import {add} from 'date-fns';

const prisma = new PrismaClient();



// async function main() {

//     await prisma.testResult.deleteMany({})
//     await prisma.courseEnrollment.deleteMany({})
//     await prisma.test.deleteMany({})
//     await prisma.user.deleteMany({})
//     await prisma.course.deleteMany({})

//     const grace = await prisma.user.create({
//         data: {
//           email: 'grace@hey.com',
//           firstName: 'Grace',
//           lastName: 'Bell',
//           social: {
//             facebook: 'gracebell',
//             twitter: 'therealgracebell',
//           },
//         },
//       })

//       const weekFromNow = add(new Date(), {days: 7})
//       const twoWeekFromNow = add(new Date(), {days: 14})
//       const monthFromNow = add(new Date(), {days: 28})

//       const course = await prisma.course.create({
//         data: {
//             name: 'CRUD with Prisma',
//             tests: {
//                 create: [
//                     {
//                         date: weekFromNow,
//                         name: 'First test',
//                     },
//                     {
//                         date: twoWeekFromNow,
//                         name: 'Second test',
//                     },
//                     {
//                         date: monthFromNow,
//                         name: 'Final test',
//                     }
//                 ]
//             },
//             members: {
//                 create: {
//                     role: 'TEACHER',
//                     user: {
//                         connect: {
//                             email: grace.email
//                         }
//                     }
//                 }
//             }
//         },
//         include: {
//             tests: true,
//         },
//       })

//       const shakuntala = await prisma.user.create({
//         data: {
//           email: 'devi@prisma.io',
//           firstName: 'Shakuntala',
//           lastName: 'Devi',
//           courses: {
//             create: {
//               role: 'STUDENT',
//               course: {
//                 connect: { id: course.id },
//               },
//             },
//           },
//         },
//       })
      
//       const david = await prisma.user.create({
//         data: {
//           email: 'david@prisma.io',
//           firstName: 'David',
//           lastName: 'Deutsch',
//           courses: {
//             create: {
//               role: 'STUDENT',
//               course: {
//                 connect: { id: course.id },
//               },
//             },
//           },
//         },
//       })

//       const testResultsDavid = [650, 900, 950]
//       const testResultsShakuntala = [800, 950, 910]

//       let counter = 0
//       for (const test of course.tests) {
//         await prisma.testResult.create({
//             data: {
//                 gradedBy: {
//                     connect: {email: grace.email}
//                 },
//                 student: {
//                     connect: {email: shakuntala.email}
//                 },
//                 test: {
//                     connect: {id: test.id}
//                 },
//                 result: testResultsShakuntala[counter]
//             }
//         })


//         await prisma.testResult.create({
//             data: {
//                 gradedBy: {
//                     connect: {email: grace.email}
//                 },
//                 student: {
//                     connect: {email: david.email}
//                 },
//                 test: {
//                     connect: {id: test.id}
//                 },
//                 result: testResultsDavid[counter]
//             }
//         })

//         const results = await prisma.testResult.aggregte({
//             where: {
//                 testId: test.id
//             },
//             avg: {result: true},
//             max: {result: true},
//             min: {result: true},
//             count: true
//         })
//         console.log(`test: ${test.name} (id: $test.id)`, results)

//         counter++
//       }

//       //Get aggregates for David
//       const davidAggregates = await prisma.testResult.aggregate({
//         where: {
//             student: {email: david.email}
//         }, 
//         avg: {result : true},
//         max: {result : true},
//         min: {result : true},
//         count: true
//       })
//       console.log(`David's results (email: ${david.email})`, davidAggregates)


//       const shakuntalaAggregates = await prisma.testResult.aggregate({
//         where: {
//             student: {email: shakuntala.email}
//         }, 
//         avg: {result : true},
//         max: {result : true},
//         min: {result : true},
//         count: true
//       })
//       console.log(`Shakuntala's results (email: ${shakuntala.email})`, shakuntalaAggregates)
// }

async function main(): Promise<Record<any, any>> {
  const getUsers = async (): Promise<Record<string, any>[]> => {
    const users = await prisma.user.findMany();
    return users;
  };

  const getUserByEmail = async (email: string): Promise<{} | null> =>
    await prisma.user.findUnique({ where: { email } });

  const getUserBySessionToken = async (
    sessionToken: string
  ): Promise<Record<string, any> | null> =>
    await prisma.authentication.findUnique({ where: { sessionToken } });

  const getUserById = async (id: number): Promise<{} | null> =>
    await prisma.user.findUnique({ where: { id } });

  const createUser = async (data: Record<string, any> | any): Promise<Record<string, any> | null> => {
    try{
        return await prisma.user.create({ data });
    }catch(error){
        console.log(error)
        throw new Error(`Error creating user`)
    }
  } 

  const deleteUserById = async (id: number): Promise<Record<string, any> | null> =>{
    try{
        return await prisma.user.delete({ where: { id } });
    }catch(error){
        console.error(error)
        throw new Error('Error deleting user')
    }
  }

  const updateUserById = async (id: number, data: any): Promise<Record<string, any> | null> =>
    await prisma.user.update({ where: { id }, data });



    return {
        getUsers,
        getUserByEmail,
        getUserBySessionToken,
        getUserById,
        createUser,
        deleteUserById,
        updateUserById
    }
}






main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
}) 
.finally(async () => {
    //disconnect prisma client
    await prisma.$disconnect()
})