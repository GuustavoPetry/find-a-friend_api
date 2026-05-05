import { PrismaOrganizationRepository } from "../../repositories/prisma/prisma-organization-repository";
import { OrganizationService } from "../organization.service";

export function makeOrganizationService() {
    const organizationRepository = new PrismaOrganizationRepository();
    const service = new OrganizationService(organizationRepository);

    return service;
}