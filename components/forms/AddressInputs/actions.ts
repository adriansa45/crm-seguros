"use server"

import prisma from "@/lib/db"
import { cache } from 'react'

export const GetStates = cache(async () => {
    return await prisma.states.findMany();
})

export const GetCities = cache(async (stateId:string) => {
    stateId ?? "0"

    return await prisma.cities.findMany({
        where:{
            state_id: Number.parseInt(stateId) ?? 0
        }
    });
})

export const GetNeighborhoods = cache(async (city_id:string, zip_code: string) => {
    if (!city_id) return []

    return await prisma.neighborhoods.findMany({
        where:{
            city_id: Number.parseInt(city_id) ?? 0,
            zipcode: zip_code
        }
    });
})