import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makePetService } from "../services/factories/make-pet-service";
import { Size, Specie } from "@prisma/client";

export async function petController(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify();

    const createPetSchema = z.object({
        specie: z.enum(Specie),
        size: z.enum(Size),
        age: z.number(),
    });

    const { specie, size, age } = createPetSchema.parse(request.body);

    const organization_id = request.user.sub;

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