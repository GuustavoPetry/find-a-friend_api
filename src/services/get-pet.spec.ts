import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPet } from "../repositories/in-memory/in-memory-pet";
import { PetService } from "./pet.service";
import { GetPetService } from "./get-pet.service";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";
import { get } from "node:http";

let petRepository: InMemoryPet;
let organizationRepository: InMemoryOrganization;
let sut: GetPetService;

describe("Get Pet Service", () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganization();
        petRepository = new InMemoryPet(organizationRepository);
        sut = new GetPetService(petRepository);
    });

    it("should be able to get a specific pet", async () => {
        const organization = await organizationRepository.create({
            name: "ORG-1",
            adress: "Blumenau",
            whatsapp: "47123456999",
            email: "org1@gmail.com",
            password: "123456",
        });

        const organization_id = organization.id;

        const createPet = await petRepository.create({
            specie: "cat",
            size: "small",
            age: 1,
            organization_id,
        });

        const petId = createPet.id;

        const getPet = await sut.execute({
            id: petId
        });

        expect(getPet).toEqual(expect.objectContaining({
            pet: {
                id: petId,
                specie: "cat",
                size: "small",
                age: 1,
                organization_id,
            }
        }));

    });
});