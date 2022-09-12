import { Wifies } from "@prisma/client";

export type IWifiData = Omit<Wifies, 'id' | 'userId'>

export type INewWifiData = Omit<Wifies, 'id'>