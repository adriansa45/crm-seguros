"use server"

import prisma from "@/lib/db"
import { cache } from 'react'

export const GetStates = cache(async () => {
    return await prisma.states.findMany();
})

export const GetCities = cache(async () => {
    return await prisma.cities.findMany();
})

export const GetNeighborhoods = cache(async ( zipcode:string, city: string) => {
    return await prisma.neighborhoods.findMany({
        where:{
            city_id: Number(city),
            zipcode: zipcode
        }
    });
})