import { BattlelogClient, CacheMap, User, Server } from "./src/index";

let battlelog = new BattlelogClient();
let bf4 = battlelog.game("bf4");

test("CacheMap.structureData(key, value, op+tions)", () => {
  let map = new CacheMap();

  expect(Array.from(map)).toStrictEqual([["key", "value"]]);
});

describe("Test functions for User instance", async () => {
  let user = await bf4.fetchUser("DANNYonPC");

  test("Recycle the User instance", () => {
    let recycledUser = new User(bf4, user);
    expect(recycledUser).toStrictEqual(user);
  });

  describe("", () => {});
});

test("Fetch servers and recycle one of them.", async () => {
  let server = Array.from(await bf4.fetchServers())[0][1];

  let recycledServer = new Server(bf4, server);

  expect(recycledServer).toStrictEqual(server);
});
