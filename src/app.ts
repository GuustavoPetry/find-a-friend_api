import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { organizationController } from "./controllers/organization.controller";
import { petController } from "./controllers/pet.controller";
import { env } from "./env";
import { authenticateController } from "./controllers/authenticate.controller";
import { verifyJWT } from "./utils/jwt-verify";
import { fetchPetsFromCityController } from "./controllers/fetch-pets-from-city.controller";
import { getPetController } from "./controllers/get-pet.controller";

export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});

app.post("/organization", organizationController);
app.post("/authenticate", authenticateController);
app.get("/pet", fetchPetsFromCityController);
app.get("/pet/:id", getPetController);

/** Authenticated */
app.post("/pet", { onRequest: [verifyJWT] }, petController);