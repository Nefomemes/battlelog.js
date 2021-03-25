const utils = require("../utils/utils");
class ForumChannel {

    constructor(forum, data) {

        /**
         * @property {GameClient} client - The client used to access this user.
         */
        Object.defineProperties(this, {
            client: {
                value: forum.client,
                enumerable: false
            }, 
            forum: {
                value: forum
            }
        })

        Object.defineProperty()

        this.structureData(data);
    }
    /**
     * Fetch posts and information of this channel on Battlelog. Then refresh the instance with the data.
     * 
     * @async
     * @function
     * @returns {ForumCategory} - The instance
     */

    async fetch() {

        const res = await this.client.axios.get(`/forum/view/${this.id}`);


        this.structureData(res.data.context.forum);

        return this;

    }
}

module.exports.ForumChannel = ForumChannel;
