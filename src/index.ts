export { User } from "./classes/user";
export { Platoon } from "./classes/platoon";
export { GameClient } from "./classes/gameclient";
import { BattlelogClient } from "./classes/blclient";
export { BattlelogClient } from "./classes/blclient";
export { Soldier } from "./classes/soldier";
export { Server } from "./classes/server";
export { CacheMap } from "./classes/cachemap";
export utils from "./utils";
export default (...params: Array<any>) => {
  return new BattlelogClient(...params);
};
