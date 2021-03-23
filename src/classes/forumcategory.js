const utils = require("../utils/utils")

/**
 * Represents a Forum Category.
 * 
 * @class
 */
class ForumCategory {

  /**
   * 
   * @param {ForumClient} forum - The forum client of this instance.
   * @param {object} data - The data of this instance.
   */
    constructor(forum, data){
      Object.defineProperty(this, 'client', {
        value: forum.client,
        enumerable: false
      });

      Object.defineProperty(this, 'forum', {
        value: forum,
        enumerable: false
      })


      this.structureData(data);
    }
  
  /**
   *  Structure data
   * 
   * @param {object} object - The object used to structure the instance.
   * @param data
   * @function
   * @returns {ForumCategory} - The instance
   */
    structureData(data){
utils.structureData(this, data);
return this;
    }
 
    
}

module.exports.ForumCategory = ForumCategory;
