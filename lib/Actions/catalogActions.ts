"use server"

import prisma from "@/lib/db"
import { cache } from 'react'

export const GetBanks = cache(async () => {
    return await prisma.banks.findMany();
})

export const GetPayrolls = cache(async () => {
    return await prisma.payrolls.findMany();
})

export const GetAffiliates = cache(async () => {
    return await prisma.affiliates.findMany();
})