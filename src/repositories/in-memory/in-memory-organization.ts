import { Prisma, Organization } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { randomUUID } from "node:crypto";
import { compare } from "bcryptjs";

export class InMemoryOrganization implements OrganizationRepository {
    public items: Organization[] = [];

    async create(data: Prisma.OrganizationUncheckedCreateInput) {
        const organization = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            whatsapp: data.whatsapp,
            adress: data.adress,
        }

        this.items.push(organization);

        return organization;
    }

    async findByEmail(email: string) {        
        return this.items.find((item) => item.email === email) ?? null;
    }

}