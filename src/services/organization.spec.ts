import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";
import { OrganizationService } from "./organization.service";

let organizationRepository: InMemoryOrganization;
let sut: OrganizationService;

describe("Create Organization Service", () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganization();
        sut = new OrganizationService(organizationRepository);
    });

    it("should be able to create organization", async () => {
        const { organization } = await sut.execute({
            name: "Gustavo Petry",
            email: "ogustavopetry@gmail.com",
            password: "123456",
            whatsapp: "47996000561",
            adress: "Vila Itoupava - Blumenau - SC"
        });

        expect(organization).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: "Gustavo Petry"
            })
        );
    });

    it("should be able to find organization for email", async () => {
        await sut.execute({
            name: "ORG-1",
            email: "org1@gmail.com",
            password:"123456",
            whatsapp: "47123654999",
            adress: "Blumenau - SC"
        });

        await sut.execute({
            name: "ORG-2",
            email: "org2@gmail.com",
            password:"123456",
            whatsapp: "47123654999",
            adress: "Blumenau - SC"
        });

        const organization = await organizationRepository.findByEmail("org2@gmail.com");

        expect(organization).toEqual(expect.objectContaining({ email: "org2@gmail.com" }))
    });
});