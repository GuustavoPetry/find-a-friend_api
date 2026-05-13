import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetPetService } from "../services/factories/make-get-pet-service";

export async function getPetController(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
        id: z.string()
    });

    console.log("Params:", request.params);

    const { id } = paramsSchema.parse(request.params);

    try {
        const service = makeGetPetService();

        const { pet } = await service.execute({
            id
        });

        return reply.status(200).send({ pet })
    } catch (err) {
        return reply.status(400).send({ err });
    }
}