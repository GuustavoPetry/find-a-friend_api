import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";
import request from "supertest";

describe("Get a Specific Pet e2e", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to get a specific pet", async () => {
        const organization = await request(app.server)
            .post("/organization")
            .send({
                name: "org1",
                adress: "Blumenau",
                whatsapp: "47123456999",
                email: "org1@gmail.com",
                password: "123456"
            });

        const authenticate = await request(app.server)
            .post("/authenticate")
            .send({
                email: "org1@gmail.com",
                password: "123456"
            });

        const { token } = authenticate.body;

        const createPet = await request(app.server)
            .post("/pet")
            .set("Authorization", `Bearer ${token}`)
            .send({
                specie: "cat",
                size: "small",
                age: 5
            });

        const { id: petId } = createPet.body;

        const getPet = await request(app.server)
            .get(`/pet/${petId}`)
            .send();

        expect(getPet.statusCode).toEqual(200);
    });
});