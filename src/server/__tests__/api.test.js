const request = require("supertest");
const app = require("../app"); 

describe("API Endpoints", () => {
  it("should return success on valid credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "admin", password: "1234" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("token", "mock-token");
  });

  it("should return 401 on invalid credentials", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "wrong", password: "wrong" });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("success", false);
  });

  it("should return list of projects", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
