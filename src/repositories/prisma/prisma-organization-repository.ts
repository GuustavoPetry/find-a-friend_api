import { Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { prisma } from "../../libs/prisma";

export class PrismaOrganizationRepository implements OrganizationRepository {
    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = await prisma.organization.create({ data });

        return organization;
    }
}