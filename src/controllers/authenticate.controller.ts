import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeAuthenticateService } from "../services/factories/make-authenticate-service";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const service = makeAuthenticateService();

        const { organization } = await service.execute({
            email,
            password
        });

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: organization.id
                }
            }
        );

        return reply.status(200).send({
            token,
        })

    } catch (err) {
        return reply.status(401).send(err)
    }

}