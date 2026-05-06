import fastify from "fastify";
import { organizationController } from "./controllers/organization.controller";
import { petController } from "./controllers/pet.controller";

export const app = fastify();

app.post("/organization", organizationController);
app.post("/pet", petController);