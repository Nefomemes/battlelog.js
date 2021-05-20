
import * as utils from '../utils';
import { GameClient } from "./gameclient";
import type { SupportedGames } from "../types/games";
/**

 * Represents a Battlelog sessio
 ccs
 *
 * @class
 */

export class BattlelogClient {



  /**

   * Creates a new Battlelog session.
    *
   * @class
   * @paramoptions- The options used here.
   */

  constructor(options: object = {}) {
    if (options && typeof options !== "object") {
      throw Error(
        `Parameter 'options' is required to be an object.  While it is ${utils.getArticle(
          typeof options
        )} ${typeof options}.`
      );
    }
  };

  private clients: {
    bf3?: GameClient,
    bf4?: GameClient,
    bfh?: GameClient,
    mohw?: GameClient
} = {};
  
  /**

   * Creates a new GameClient instance.
   *
   * @param params - The params used to create the instance.
   */
  game(game: SupportedGames) {  
  this.clients[game] = this.clients[game] || new GameClient(this, game);
  return this.clients[game];
  }
}


