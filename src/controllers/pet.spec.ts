import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";
import request from "supertest";

describe("Create Pet Controller", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a pet vinculated a organization", async () => {
        const organization = await request(app.server)
            .post("/organization")
            .send({
                name: "org1",
                adress: "Blumenau",
                whatsapp: "47123456999",
                email: "org1@gmail.com",
                password: "123456"
            });

        const auth = await request(app.server)
            .post("/authenticate")
            .send({
                email: "org1@gmail.com",
                password: "123456"
            });

        const { token } = auth.body;

        const pet = await request(app.server)
            .post("/pet")
            .set("Authorization", `Bearer ${token}`)
            .send({
                specie: "dog",
                size: "big",
                age: 2
            });

        const { id: petId } = pet.body;

        expect(pet.statusCode).toEqual(201);
        expect(pet.body).toEqual(expect.objectContaining({ id: petId }));
    });
});