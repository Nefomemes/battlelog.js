const { BattlelogMap } = require("./blmap");
const utils = require("../utils/utils");
const { ForumCategory } = require("./forumcategory");

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
    Object.defineProperty(this, "client", { value: client, enumerable: false });
 
   }
  /**
   * Structure data
   *
   * @function
   * @param {Array<ForumCategory>|ForumCategory} data - The data of this instance.
   */
  structureData(data){
    if(Array.isArray){
    for(let forumCategory of data){
      this.categories.structureData(forumCategory.id, new ForumCategory(this.client, forumCategory));
 
    }} else if(data instanceof ForumCategory){
        this.categories.structureData(data.id, data);

     }
    return this;
  }
  /**
   *
   * @function
   * @async
   */
  async fetch() {
    const res = await this.client.get("/forum");

    this.structureData(res.data.context.categories);
  }

  categories = new BattlelogMap();
}

module.exports.ForumClient = ForumClient;
