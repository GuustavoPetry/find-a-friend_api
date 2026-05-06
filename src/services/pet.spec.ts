import { beforeEach, describe, expect, it } from "vitest";
import { PetRepository } from "../repositories/pet-repository";
import { PetService } from "./pet.service";
import { InMemoryPet } from "../repositories/in-memory/in-memory-pet";
import { OrganizationRepository } from "../repositories/organization-repository";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";

let organizationRepository: OrganizationRepository;
let petRepository: PetRepository;
let sut: PetService;

describe("Pet Service", () => {
    beforeEach(() => {
        petRepository = new InMemoryPet();
        organizationRepository = new InMemoryOrganization();
        sut = new PetService(petRepository);
    });

    it("should be able to create pet linked a organization", async () => {
        const organization = await organizationRepository.create({
            name: "org-1",
            email: "org@gmail.com",
            password: "123456",
            whatsapp: "47123456999",
            adress: "Blumenau - SC"
        });

        const { pet } = await sut.create({
            specie: "DOG",
            size: "AVERAGE",
            age: 3,
            organization_id: organization.id
        });

        expect(pet).toEqual(expect.objectContaining({
            id: expect.any(String),
            specie: "DOG",
            size: "AVERAGE",
            organization_id: organization.id
        }));
    });
});