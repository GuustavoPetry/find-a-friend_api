import { PrismaOrganizationRepository } from "../../repositories/prisma/prisma-organization-repository";
import { AuthenticateService } from "../authenticate.service";

export function makeAuthenticateService() {
    const organizationRepository = new PrismaOrganizationRepository();
    const service = new AuthenticateService(organizationRepository);

    return service;
}