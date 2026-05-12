import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFethPetsFromCityService } from "../services/factories/make-fetch-pets-from-city-service";

export async function fetchPetsFromCityController(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        city: z.string()
    });

    const { city } = bodySchema.parse(request.body);

    try {
        const service = makeFethPetsFromCityService();

        const { pets } = await service.execute({
            city,
        });

        return reply.status(200).send({
            pets
        });

    } catch (err) {
        return reply.status(400).send({
            message_error: `Not pets in this city`
        });
    }
}