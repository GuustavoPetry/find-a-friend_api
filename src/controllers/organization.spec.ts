import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../app";
import request from "supertest";

describe("Organization E2E", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a organization", async () => {
        const organization = await request(app.server)
            .post("/organization")
            .send({
                name: "Org1",
                adress: "Blumenau",
                whatsapp: "47123456999",
                email: "org1@gmail.com",
                password: "123456"
            });

        expect(organization.statusCode).toEqual(201);
    });
});