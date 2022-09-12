import { Credentials } from "@prisma/client";

export type ICredentialData = Omit<Credentials, 'id' | 'userId'>

export type INewCredentialData = Omit<Credentials, 'id'>
