import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository";
import { FetchPetsFromCityService } from "../fetch-pets-from-city.service";

export function makeFethPetsFromCityService() {
    const petRepository = new PrismaPetRepository();
    const service = new FetchPetsFromCityService(petRepository);

    return service;
}