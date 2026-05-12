import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeFethPetsFromCityService } from "../services/factories/make-fetch-pets-from-city-service";
import { Size, Specie } from "@prisma/client";

export async function fetchPetsFromCityController(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        city: z.string(),
        size: z.enum(Size).optional(),
        specie: z.enum(Specie).optional(),
        age: z.coerce.number().optional()
    });

    const { city, size, specie, age } = bodySchema.parse(request.body);

    try {
        const service = makeFethPetsFromCityService();

        const { pets } = await service.execute({
            city,
            size,
            specie,
            age
        });

        return reply.status(200).send({
            pets
        });

    } catch (err) {
        console.log(err)
        return reply.status(400).send({
            message_error: `Not pets in this city`,
        });
    }
}