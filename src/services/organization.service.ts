import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organization-repository";
import { hash } from "bcryptjs";

interface CreateOrganizationRequest {
    name: string,
    email: string,
    password: string,
    whatsapp: string,
    adress: string
}

interface CreateOrganizationResponse {
    organization: Organization
}

export class OrganizationService {
    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({
        name,
        email,
        password,
        whatsapp,
        adress
    }: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
        const password_hash = await hash(password, 6);

        const organization = await this.organizationRepository.create({
            name,
            email,
            password: password_hash,
            whatsapp,
            adress
        });

        return { organization }
    }
}