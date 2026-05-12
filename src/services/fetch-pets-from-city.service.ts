import { Pet, Size, Specie } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repository";

export interface FetchPetsForCityRequest {
    city: string,
    size?: Size | undefined,
    specie?: Specie | undefined,
    age?: number | undefined
}

export interface FetchPetsForCityResponse {
    pets: Pet[]
}

export class FetchPetsFromCityService {
    constructor(private petsRepository: PetRepository) { }

    async execute({
        city,
        size,
        specie,
        age
    }: FetchPetsForCityRequest): Promise<FetchPetsForCityResponse> {
        const pets = await this.petsRepository.fetchPetsForCity(city, size, specie, age);

        if (!pets) {
            throw new Error(`Not pets in this city`);
        }

        return { pets }
    }
}