import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";
import request from "supertest";

describe("Authenticate e2e", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to authenticate in the system", async () => {
        await request(app.server)
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

        expect(authenticate.statusCode).toEqual(200);
        expect(authenticate.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
    });
});