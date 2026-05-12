import { Pet } from "@prisma/client";
import { PetRepository } from "../repositories/pet-repository";

export interface FetchPetsForCityRequest {
    city: string
}

export interface FetchPetsForCityResponse {
    pets: Pet[]
}

export class FetchPetsFromCityService {
    constructor(private petsRepository: PetRepository) { }

    async execute({
        city
    }: FetchPetsForCityRequest): Promise<FetchPetsForCityResponse> {
        const pets = await this.petsRepository.fetchPetsForCity(city);

        if (!pets) {
            throw new Error(`Not pets in this city`);
        }

        return { pets }
    }
}