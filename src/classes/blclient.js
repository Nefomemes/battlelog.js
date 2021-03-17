<<<<<<< HEAD

const utils = require("../utils/utils");
const { GameClient } = require("./gameclient");

class BattlelogClient {
	type = "BattlelogClient"
	
	
	constructor(options = {}){
		if(options && typeof options !== "object"){
			throw Error(`Parameter 'options' is required to be an object.  While it is ${utils.getArticle(typeof options)} ${typeof options}.`);
		}


	}
	
	game(...params) {
		return new GameClient(this, ...params);

	}
	
}
	
module.exports.BattlelogClient = BattlelogClient;
=======
const utils = require("../utils/utils");
const { GameClient } = require("./gameclient");
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
   * @param {object} options- The options used here.
   */

  constructor(options = {}) {
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
>>>>>>> 6fd1b11e6854fc741831a2859af99e04412fc7fb
