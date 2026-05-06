import { Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { prisma } from "../../libs/prisma";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetUncheckedCreateInput){
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
}