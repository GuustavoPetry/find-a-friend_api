import { PrismaPetRepository } from "../../repositories/prisma/prisma-pet-repository";
import { GetPetService } from "../get-pet.service";

export function makeGetPetService() {
    const repository = new PrismaPetRepository();
    const service = new GetPetService(repository);

    return service;
}