import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makePetService } from "../services/factories/make-pet-service";

export async function petController(request: FastifyRequest, reply: FastifyReply) {
    const createPetSchema = z.object({
        specie: z.enum(["DOG", "CAT"]),
        size: z.enum(["SMALL", "BIG", "AVERAGE"]),
        age: z.number(),
        organization_id: z.uuid()
    });

    const { specie, size, age, organization_id } = createPetSchema.parse(request.body);

    try {
        const service = makePetService();

        service.create({
            specie,
            size,
            age,
            organization_id
        });

    } catch (err) {
        if (err) {
            return reply.status(400).send({
                err,
            });
        }
    }

    return reply.status(201).send({
        message: "Created Pet",
    });

}