import { Prisma, Size, Specie } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { prisma } from "../../libs/prisma";
import { size } from "zod";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data: {
                specie: data.specie,
                size: data.size,
                age: data.age,
                organization_id: data.organization_id
            }
        });

        return pet;
    }

    async fetchPetsForCity(city: string, size?: Size, specie?: Specie, age?: number) {
        const where: Prisma.PetWhereInput = {
            organization: {
                adress: {
                    contains: city,
                    mode: "insensitive"
                }
            }
        }

        if (size !== undefined) where.size = size;

        if (specie !== undefined) where.specie = specie;

        if (age !== undefined) where.age = age;

        const pets = await prisma.pet.findMany({ where })

        return pets;
    }
}