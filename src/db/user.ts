import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<Record<string, any>[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByEmail = async (email: string): Promise<Record<string, any> | null> =>
  await prisma.user.findUnique({ where: { email } });

export const getUserBySessionToken = async (
  sessionToken: string
): Promise<Record<string, any> | null> => {
  const userIdent: Prisma.AuthenticationSelect = {
    userId: true,
  };

  const authToken = await prisma.authentication.findUnique({
    where: {
      sessionToken,
    },
    select: userIdent,
  });

  if (authToken) {
    const authUser = await prisma.user.findUnique({
      where: {
        id: authToken.userId,
      },
    });

    return authUser;
  }

  return null;
}
 

export const getUserById = async (id: number): Promise<{} | null> =>
  await prisma.user.findUnique({ where: { id } });

export const createUser = async (
  data: Record<string, any> | any
): Promise<Record<string, any> | null> => {
  try {
    return await prisma.user.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error(`Error creating user`);
  }
};

export const deleteUserById = async (
  id: number
): Promise<Record<string, any> | null> => {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user");
  }
};

export const updateUserById = async (
  id: number,
  data: Record<string, any> | any
): Promise<Record<string, any> | null> =>
  await prisma.user.update({ where: { id }, data });


export const createAuth = async (data: Record<string, any> | any): Promise<Record<string, any> | null> => {
  try {
    return await prisma.authentication.create({data});
  } catch (error) {
    console.error(error);
    throw new Error("Error creating authentication");
  }
};


export const updateAuthByUserId = async (userId: number, data: Record<string, any> | any): Promise<Record<string, any> | null> => await prisma.authentication.update({ where: { userId }, data });