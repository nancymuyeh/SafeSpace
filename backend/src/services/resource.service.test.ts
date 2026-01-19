import { getResources } from "./resource.service";
import { db } from "../db";
import redis from "../redis";

jest.mock("../db", () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn(),
  },
}));

jest.mock("../redis", () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
}));

describe("Resource Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch resources from the database when cache is empty", async () => {
    const mockResources = [{ id: 1, title: "Test Resource" }];
    (redis.get as jest.Mock).mockResolvedValue(null);
    (db.select().from as jest.Mock).mockResolvedValue(mockResources);

    const result = await getResources();

    expect(redis.get).toHaveBeenCalledWith("resources");
    expect(db.select().from).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalledWith(
      "resources",
      JSON.stringify(mockResources),
      "EX",
      3600
    );
    expect(result).toEqual(mockResources);
  });

  it("should fetch resources from the cache when available", async () => {
    const mockResources = [{ id: 1, title: "Test Resource" }];
    (redis.get as jest.Mock).mockResolvedValue(JSON.stringify(mockResources));

    const result = await getResources();

    expect(redis.get).toHaveBeenCalledWith("resources");
    expect(db.select().from).not.toHaveBeenCalled();
    expect(result).toEqual(mockResources);
  });
});
