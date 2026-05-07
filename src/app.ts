import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { organizationController } from "./controllers/organization.controller";
import { petController } from "./controllers/pet.controller";
import { env } from "./env";
import { authenticateController } from "./controllers/authenticate.controller";
import { verifyJWT } from "./utils/jwt-verify";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});

app.post("/organization", organizationController);
app.post("/authenticate", authenticateController);

/** Authenticated */
app.post("/pet", { onRequest: [verifyJWT] }, petController);