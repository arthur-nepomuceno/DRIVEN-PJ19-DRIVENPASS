import { Credentials } from "@prisma/client";

export type ICredentialData = Omit<Credentials, 'id'>