import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository";
import { PetService } from "../pet.service";

export function makePetService() {
    const petRepository = new PrismaPetRepository();
    const service = new PetService(petRepository);

    return service;
}