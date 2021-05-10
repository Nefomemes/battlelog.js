/**
 * Custom Map class for battlelog.js utilities.
 *
 * @class
 * @augments Map
 */
export class CacheMap extends Map {

  
  

  /**
   * If the key existed in the instance, calls
   *
   * @function
   * @param {*} key
   * @param {*} value
   * @param {...*} structureDataStuff - The additional parameters to be passed
   *     to the key's structureData method.
   */

  structureData(key: Map<any> | Array<any> | any, value?: any, options?: {
    structureDataParams?: Array<any>,
    callbackKey?: Function,
    callbackValue?: Function
  } = {}) {

    function runCallback(k?: Function, v: Function) {
      let result = [];
  
      if(typeof options.callbackKey === "function") result[0] = options.callbackKey(k, v, options);
      else result[0] = k;
  
      if(typeof options.callbackValue === "function") result[1] = options.callbackValue(k, v, options);
      else result[1] = v;
      
      return result;
    }
    
    if (key && value) {
        
         
        
         if (super.get(key)) super.get(key)<{structureData: Function}>.structureData(value, ...(options.structureDataParams || [])));
        else super.set(...<[any, any]>runCallback(key, value, options));
        
      } else if (!key && value instanceof Map) {
      	
      
   
      } else if (!key && Array.isArray(value)) {
  
        for (let v of value) {
          this.structureData(...runCallback(null, v));
        }

      
      } else throw Error("Invalid syntax");
  return this;
  }
}

