process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const companies = require("../db");



describe("GET /companies", () => {
    test("Get all companies", async () => {
        const res = await request(app).get("/companies");
        expect(res.statusCode).toBe(200);
    })
})
