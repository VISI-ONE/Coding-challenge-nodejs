import request from "supertest";
import app from "../../app";

describe("GET /vehicles", () => {
  test("should return vehicles when no filter applied", async () => {
    const res = await request(app).get(`/vehicles`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(5);
  });

  it.each([
    { filter: "make", value: "Toyota", count: 1 },
    { filter: "model", value: "Focus", count: 1 },
    { filter: "year", value: "2019", count: 1 },
    { filter: "color", value: "Red", count: 1 },
    { filter: "license_plate", value: "GHI789", count: 1 },
  ])(
    "should return $count vehicles when $filter is $value",
    async ({ filter, value, count }) => {
      const res = await request(app).get(`/vehicles?${filter}=${value}`);
      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(count);
    }
  );
});
