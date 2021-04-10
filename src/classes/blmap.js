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

  structureData(options, optionalValue, optionalOptions) {
    function runCallback(key, value) {
      let result = [];

      if(typeof options.callbackKey === "function") result[0] = options.callbackKey(key);
      else result[0] = key;

      if(options.callbackValue === "function") result[0] = options.callbackValue(value)
      else result[0] = value;
      
      return result;
    }
    // Easter egg! Reference to this article on DEV: https://dev.to/jmdejager/commit-or-vomit-cast-2b2g
    switch (true) {
      case (options.values instanceof Map): {
        options.map.forEach((k, v) => {
          
          return this.structureData(...runCallback(k, v));
        }
        );

        break;
      }
      case (options.values instanceof Array): {
        for (let [key, value] of options.values) {
          this.structureData(...runCallback(key, value));
        }

        break;
      }
      case (optionalValue): {
         this.structureData({key: options, value: optionalValue, ...optionalOptions});
      }
      case (options.key && options.value): {
        if (super.get(options)) super.get(key).structuredata(value, ...options.structureDataParams);
        else super.set(runCallback(options.key, options.value));


      }
    }
    
  return this;
  }
}

module.exports.BattlelogMap = BattlelogMap;
