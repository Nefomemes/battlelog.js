<<<<<<< HEAD:src/classes/blclient.ts
import utils from '../utils/utils';
import { GameClient } from "./gameclient";
=======
const utils = require("../utils");
const { GameClient } = require("./gameclient");
>>>>>>> dev:src/classes/blclient.js
/**

 * Represents a Battlelog session.
 *
 * @class
 */

class BattlelogClient {
  type = "BattlelogClient";

  /**

   * Creates a new Battlelog session.
   *
   * @class
   * @paramoptions- The options used here.
   */

  constructor(options?: object = {}) {
    if (options && typeof options !== "object") {
      throw Error(
        `Parameter 'options' is required to be an object.  While it is ${utils.getArticle(
          typeof options
        )} ${typeof options}.`
      );
    }
  }

  /**

   * Creates a new GameClient instance.
   *
   * @param {...*} params - The params used to create the instance.
   */
  game(...params) {
    return new GameClient(this, ...params);
  }
}

module.exports.BattlelogClient = BattlelogClient;
