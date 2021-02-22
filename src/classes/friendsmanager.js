const { User } = require("./user");
/**
 * Represents the user's friend list.
 * 
 * @class
 */
class FriendsManager {
  

    /**
     * A cache of the user's friends.
     * 
     * @property
     */
    cache = new Map()
    
  /**
   * Creates a new FriendsManager instance.
   * 
   * @class
   * @param {User} user - The user that owns this friend list.
   * @param {Array} data - An array of the user's friend. 
   */
    constructor(user, data){
        /**
         * The user of this instance.
         * 
         * @property
         */
        this.user = user;

        this.structureData(data);
    }
    /**
     * 
     * @param {object} data - Raw data 
     */
    structureData(data){
        for(let user of data){
            this.cache.set(user.userId, new User(this.user.client, user))
        }

        return this;
    }
    
    fetch(){
        return this.user.fetch();
    }
    
}


module.exports.FriendsManager = FriendsManager;