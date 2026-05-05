import { Organization, Prisma } from "@prisma/client";

export interface OrganizationRepository {
    create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>;
}