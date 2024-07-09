"use server"

import prisma from "@/lib/db"
import { cache } from 'react'

export const GetStates = cache(async () => {
    return await prisma.states.findMany();
})

export const GetCities = cache(async () => {
    return await prisma.cities.findMany();
})

export const GetNeighborhoods = cache(async () => {
    return await prisma.neighborhoods.findMany();
})