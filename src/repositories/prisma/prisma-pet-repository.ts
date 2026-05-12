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

    async fetchPetsForCity(city: string) {
        const pets = await prisma.pet.findMany({
            where: {
                organization: {
                    adress: {
                        contains: city,
                        mode: "insensitive"
                    }
                },
            },
        });

        return pets;
    }
}