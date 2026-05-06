import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPet implements PetRepository {
    public items: Pet[] = [];

    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            specie: data.specie,
            size: data.size,
            age: data.age,
            organization_id: data.organization_id
        }

        this.items.push(pet);

        return pet;
    }
}