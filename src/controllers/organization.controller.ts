import { FastifyReply, FastifyRequest } from "fastify";
import { makeOrganizationService } from "../services/factories/make-organization-service";
import z from "zod";
import { OrganizationAlreadyExistsError } from "../services/errors/organization-already-exists.error";

export async function organizationController(request: FastifyRequest, reply: FastifyReply) {
    const createOrganizationSchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6),
        whatsapp: z.string(),
        adress: z.string()
    })


    const { name, email, password, whatsapp, adress } = createOrganizationSchema.parse(request.body);

    try {
        const service = makeOrganizationService();

        await service.execute({
            name,
            email,
            password,
            whatsapp,
            adress
        });

    } catch (error) {
        if (error instanceof OrganizationAlreadyExistsError) {
            return reply.status(409).send({ message: "Organization Already Exists" });
        }
    }

    return reply.status(201).send({ message: "Created Organization" });

}