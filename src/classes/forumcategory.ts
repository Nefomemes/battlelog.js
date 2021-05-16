<<<<<<< HEAD:src/classes/forumcategory.ts
import utils from '../utils';
import type ForumClient from './forumclient';
=======
const utils = require("../utils");
>>>>>>> dev:src/classes/forumcategory.js

/**
 * Represents a Forum Category.
 *
 * @class
 */
export class ForumCategory {
  /**
   *
   * @param forum - The forum client of this instance.
   * @param data - The data of this instance.
   */
  constructor(forum: ForumClient, data: ForumCategory) {
    Object.defineProperty(this, "client", {
      value: forum.client,
      enumerable: false,
    });

    Object.defineProperty(this, "forum", { value: forum, enumerable: false });

    this.structureData(data);
  }

  /**
   *  Structure data
   *
   * @param {object} object - The object used to structure the instance.
   * @param data
   * @function
   * @returns - The instance
   */
  structureData(data: ForumCategory) {
    utils.structureData(this, data);
    return this;
  }
}
