import { SafeNotes } from "@prisma/client";

export type ISafeNoteData = Omit<SafeNotes, 'id' | 'userId'>

export type INewNoteData = Omit<SafeNotes, 'id'>