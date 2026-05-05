import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";
import { OrganizationService } from "./organization.service";

let organizationRepository: InMemoryOrganization;
let sut: OrganizationService;

describe("Organization Service", () => {
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

        console.log(organization)

        expect(organization).toEqual(
            expect.objectContaining({
                id: expect.any(String),
                name: "Gustavo Petry"
            })
        );
    });
});