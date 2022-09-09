import { Users } from "@prisma/client";

export type IUserData = Omit<Users, 'id'>
