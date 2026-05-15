import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";
import request from "supertest";

describe("Fetch Pets From City and Filter From Characteristics", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to fetch pets filtering from city and characteristics", async () => {
        await request(app.server)
            .post("/organization")
            .send({
                name: "org1",
                adress: "Pomerode",
                whatsapp: "47123456999",
                email: "org1@gmail.com",
                password: "123456"
            });

        await request(app.server)
            .post("/organization")
            .send({
                name: "org2",
                adress: "Blumenau",
                whatsapp: "47123456666",
                email: "org2@gmail.com",
                password: "123456"
            });

        const auth_1 = await request(app.server)
            .post("/authenticate")
            .send({
                email: "org1@gmail.com",
                password: "123456"
            });

        const auth_2 = await request(app.server)
            .post("/authenticate")
            .send({
                email: "org2@gmail.com",
                password: "123456"
            });

        const { token: tokenOrganization_1 } = auth_1.body;
        const { token: tokenOrganization_2 } = auth_2.body;

        await request(app.server)
            .post("/pet")
            .set("Authorization", `Bearer ${tokenOrganization_1}`)
            .send({
                specie: "dog",
                size: "big",
                age: 1
            });

        await request(app.server)
            .post("/pet")
            .set("Authorization", `Bearer ${tokenOrganization_2}`)
            .send({
                specie: "cat",
                size: "small",
                age: 2
            });

        const response = await request(app.server)
            .get("/pet")
            .query({
                city: "blumenau"
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.pets).toEqual([
            expect.objectContaining({
                specie: "cat",
                size: "small",
                age: 2
            })
        ]);
    });
});