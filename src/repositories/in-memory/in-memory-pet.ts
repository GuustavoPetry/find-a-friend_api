import { Organization, Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "node:crypto";
import { InMemoryOrganization } from "./in-memory-organization";

export class InMemoryPet implements PetRepository {
    public items: Pet[] = [];

    constructor(private organizationRepository: InMemoryOrganization) { }

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

    async fetchPetsForCity(city: string) {
        const organizations = this.organizationRepository.items.filter(organization => organization.adress.includes(city));

        const organizationIds = organizations.map(organization => organization.id);

        const pets = this.items.filter(pet => organizationIds.includes(pet.organization_id));

        return pets;
    }

    async findById(id: string) {
        const pet = this.items.find(item => item.id === id);

        return pet ?? null;
    }
}