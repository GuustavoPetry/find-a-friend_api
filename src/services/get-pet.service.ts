import { Pet } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repository";

interface GetPetServiceRequest {
    id: string
}

interface GetPetServiceResponse {
    pet: Pet
}

export class GetPetService {
    constructor(private repository: PetRepository) { }

    async execute({
        id
    }: GetPetServiceRequest): Promise<GetPetServiceResponse> {
        const pet = await this.repository.findById(id);

        if (!pet) throw new Error(`Resource not found`);

        return { pet };
    }
}