const {BattlelogMap} = require("./blmap");
const utils = require("utils");
const {ForumCategoriesManager} = require("./fcm");

/**
 * Manages all forums.
 *
 * @class
 */
class Forums {
  /**
   * Creates a new  Forums instance.
   *
   * @param {GameClient} client
   * @param {Array} data
   */
  constructor(client, data) {
    Object.defineProperty(this, "client", {value : client, enumerable : false});
  }

  categories = new ForumCategoriesManager();
}
