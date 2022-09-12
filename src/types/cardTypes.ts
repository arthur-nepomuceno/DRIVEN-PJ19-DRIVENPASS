import { Cards } from "@prisma/client";

export type ICardData = Omit<Cards, 'id' | 'userId'>

export type INewCardData = Omit<Cards, 'id'>
