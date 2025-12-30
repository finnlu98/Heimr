import prisma from "../../Lib/prisma";

export class UserService {
  async createUser(email: string): Promise<any> {
    try {
      const user = await prisma.user.create({
        data: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by id:", error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }
}
