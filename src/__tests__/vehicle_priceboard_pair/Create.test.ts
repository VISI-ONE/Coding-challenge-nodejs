import request from "supertest";
import app from "../../app";

describe("POST /vehicles-priceboard-pairs", () => {
  test("should return 400 when vehicle_id is not valid", async () => {
    const vehicle_id = "invalid";
    const priceboard_id = "1";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(400);
  });

  test("should return 400 when priceboard_id is not valid", async () => {
    const vehicle_id = "1";
    const priceboard_id = "invalid";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(400);
  });

  test("should return 404 when priceboard does not exists", async () => {
    const vehicle_id = "1";
    const priceboard_id = "10";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(404);
  });

  test("should return 404 when vehicle does not exists", async () => {
    const vehicle_id = "10";
    const priceboard_id = "1";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(404);
  });

  test("should return 409 when priceboard and vehicle does not belong to same tenant", async () => {
    const vehicle_id = "1";
    const priceboard_id = "3";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(409);
  });

  test("should return 200", async () => {
    const vehicle_id = "1";
    const priceboard_id = "1";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(200);
  });

  test("should return 409 when vehicle and priceboard pair already exists", async () => {
    const vehicle_id = "1";
    const priceboard_id = "1";
    const res = await request(app).post(`/vehicles-priceboard-pairs`).send({
      vehicle_id,
      priceboard_id,
    });

    expect(res.status).toEqual(409);
  });
});
