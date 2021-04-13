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

  structureData(key, value, options = {}) {
    function runCallback(k, v) {
      let result = [];

      if(typeof options.callbackKey === "function") result[0] = options.callbackKey(k, v, options);
      else result[0] = k;

      if(typeof options.callbackValue === "function") result[1] = options.callbackValue(k, v, options);
      else result[1] = v;
      
      return result;
    }
    
    if (key && value) {
        
         
        
         if (super.get(key)) super.get(key).structureData(value, ...(options.structureDataParams || []));
        else super.set(...runCallback(key, value, options));
        
      } else if (!key && value instanceof Map) {
      	
        value.forEach((k, v) => {
          
          return this.structureData(...runCallback(k, v));
        }
        );

      
      } else if (!key && Array.isArray(value)) {
  
        for (let v of value) {
          this.structureData(...runCallback(null, v));
        }

      
      } else throw Error("Invalid syntax");
  return this;
  }
}

module.exports.BattlelogMap = BattlelogMap;