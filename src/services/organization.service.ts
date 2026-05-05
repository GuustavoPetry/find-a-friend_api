import { Organization } from "@prisma/client";
import { OrganizationRepository } from "../repositories/organization-repository";
import { hash } from "bcryptjs";
import { OrganizationAlreadyExistsError } from "./errors/organization-already-exists.error";

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

        const findOrganizationWithSameEmail = await this.organizationRepository.findByEmail(email);

        if (findOrganizationWithSameEmail) {
            throw new OrganizationAlreadyExistsError;
        }

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