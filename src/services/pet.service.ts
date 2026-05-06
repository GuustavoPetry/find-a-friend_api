import { Pet, Prisma, Size, Specie } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repository";

interface CreatePetRequest {
    specie: Specie
    size: Size
    age: number
    organization_id: string
}

interface CreatePetResponse {
    pet: Pet
}

export class PetService {
    constructor(private petRepository: PetRepository) { }

    async create({
        specie,
        size,
        age,
        organization_id
    }: CreatePetRequest): Promise<CreatePetResponse> {
        const pet = await this.petRepository.create({
            specie,
            size,
            age,
            organization_id
        });

        return { pet };
    }
}