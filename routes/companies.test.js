process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const companies = require("../db");

beforeEach(function() {
    companies.query(
        `DELETE FROM companies`)
    companies.query(
        'INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', ["toy", "toyota", "vroom vroom"]);
});


describe("GET /companies", () => {
    test("Get all companies", async () => {
        const res = await request(app).get("/companies");
        expect(res.statusCode).toBe(200);
        expect(res.body.companies.length).toBe(1);
    })
})
describe("GET /companies/:code", () => {
    test("Gets a single company", async () => {
        const res = await request(app).get(`/companies/toy`);
        expect(res.statusCode).toBe(200);
  
      expect(res.body).toEqual({company: {code: "toy", name: "toyota", description: "vroom vroom", invoices: [] }});
    });
  
    test("Responds with 404 if can't find company", async() => {
      const res = await request(app).get(`/cats/xxx`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /companies", () =>{
    test("Creates a new company", async () => {
      const res = await request(app)
        .post(`/companies`)
        .send({
          code: "app",
          name: "Apple",
          description: "The Mothership"
         }
        );
        console.log(res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({
        company: {code: "app", name: "Apple", description: "The Mothership" }
      });
    });
  });

  
//   /** PATCH /cats/[name] - update cat; return `{cat: cat}` */
  
  describe("PATCH /companies/:code", () => {
    test("Updates a single company", async () => {
      const res = await request(app)
        .patch(`/companies/toy`)
        .send({
          name: "Test"
        });
        console.log(res);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        company: { name: "Test" }
      });
    });
  
    test("Responds with 404 if code invalid", async () => {
      const res = await request(app).patch(`/companies/0`);
      expect(res.statusCode).toBe(404);
    });
  });
//   // end
  
//   /** DELETE /cats/[name] - delete cat,
//    *  return `{message: "Cat deleted"}` */
  
//   describe("DELETE /cats/:name", function() {
//     test("Deletes a single a cat", async function() {
//       const resp = await request(app).delete(`/cats/${pickles.name}`);
//       expect(resp.statusCode).toBe(200);
//       expect(resp.body).toEqual({ message: "Deleted" });
//     });
//   });