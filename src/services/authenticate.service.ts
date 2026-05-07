import { compare } from "bcryptjs";
import { OrganizationRepository } from "../repositories/organization-repository";
import { Organization } from "@prisma/client";

interface AuthenticateServiceRequest {
    email: string,
    password: string
}

interface AuthenticateServiceResponse {
    organization: Organization
}

export class AuthenticateService {
    constructor(private organizationRepository: OrganizationRepository) { }

    async execute({
        email,
        password
    }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const organization = await this.organizationRepository.findByEmail(email);

        if (!organization) {
            throw new Error("Invalid credentials");
        }

        const comparePassword = await compare(password, organization.password);

        if (!comparePassword) {
            throw new Error("Invalid credentials");
        }

        return {
            organization,
        } 
    }
}