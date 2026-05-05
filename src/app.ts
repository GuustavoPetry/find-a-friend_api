import fastify from "fastify";
import { organizationController } from "./controllers/organization.controller";

export const app = fastify();

app.post("/organization", organizationController);