import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository";
import { fetchPetsFromCity } from "../fetch-pets-from-city.service";

export function makeFethPetsFromCityService() {
    const petRepository = new PrismaPetRepository();
    const service = new fetchPetsFromCity(petRepository);

    return service;
}