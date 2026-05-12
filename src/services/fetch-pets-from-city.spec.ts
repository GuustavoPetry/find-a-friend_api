import { describe, expect, it, beforeEach } from "vitest";
import { FetchPetsFromCityService } from "./fetch-pets-from-city.service";
import { InMemoryPet } from "../repositories/in-memory/in-memory-pet";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";

let petsRepository: InMemoryPet;
let organizationRepository: InMemoryOrganization;
let sut: FetchPetsFromCityService;

describe("Fetch Pets From City Service", () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganization()
        petsRepository = new InMemoryPet(organizationRepository);
        sut = new FetchPetsFromCityService(petsRepository);
    });

    it("should be able to search pets from city of vinculated organization", async () => {
        const organization = await organizationRepository.create({
            name: "Org-1",
            email: "org@gmail.com",
            password: "123456",
            whatsapp: "47123456999",
            adress: "Blumenau"
        });

        const organization_id = organization.id;

        await petsRepository.create({
            specie: "CAT",
            size: "SMALL",
            age: 2,
            organization_id,
        });

        const { pets: response } = await sut.execute({
            city: "Blumenau"
        });

        expect(response).toHaveLength(1);
        expect(response).toEqual([
            expect.objectContaining({
                specie: "CAT",
                size: "SMALL",
                age: 2,
                organization_id,
            })
        ]);
    })
});