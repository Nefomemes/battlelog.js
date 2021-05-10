/**
 * Custom Map class for battlelog.js utilities.
 *
 * @class
 * @augments Map
 */
class BattlelogMap extends Map {
  /**
   * If the key existed in the instance, calls
   *
   * @function
   * @param {*} key
   * @param {*} value
   * @param {...*} structureDataStuff - The additional parameters to be passed
   *     to the key's structureData method.
   */
  structureData(options) {
    if (!key) throw Error("key is not specified");
    if (!value) throw Error("value is not specified");
    // Easter egg! Reference to this article on DEV: https://dev.to/jmdejager/commit-or-vomit-cast-2b2g
      switch (true) {
        case (options.map instanceof Map): {
          args[0].forEach((k, v) =>
            this.structureData(k, v, ...structureDataStuff)
          );
          
          break;
        }
        case (args[0] instanceof Array): {
		for(let [key, value] of args[0]){
		this.structureData()

		}
        	
        	break;
        }
        default: {
    if (super.get(key)) super.get(key).structureData(value, ...structureDataStuff);
    else super.set(key, value);
        
        
    }}
  }
}

module.exports.BattlelogMap = BattlelogMap;
