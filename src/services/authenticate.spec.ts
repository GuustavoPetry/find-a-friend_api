import { beforeEach, describe, expect, it } from "vitest";
import { OrganizationRepository } from "../repositories/organization-repository";
import { AuthenticateService } from "./authenticate.service";
import { InMemoryOrganization } from "../repositories/in-memory/in-memory-organization";
import { hash } from "bcryptjs";

let organizationRepository: OrganizationRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganization();
        sut = new AuthenticateService(organizationRepository);
    });    

    it("should be able to authenticate", async () => {
        const register = await organizationRepository.create({
            name: "org-1",
            email: "org@gmail.com",
            password: await hash("123456", 6),
            whatsapp: "123456999",
            adress: "Blumenau - SC"
        });

        const { organization: auth } = await sut.execute({
            email: register.email,
            password: "123456"
        });

        expect(auth).toEqual(expect.objectContaining({
            email: "org@gmail.com"
        }));
    });
});