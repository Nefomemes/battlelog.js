const utils = require("../utils/utils");
/**
 * Represents a Platoon
 *
 * @class
 */
class Platoon {
  /**
   * The raw template of the platoon's badge.
   *
   * @property {string}
   * @private
   */
  #badgePathRaw;

  /**
   * The platoon's badge.
   * 
   * @property {object} badge
   * @property {string} 60 - The badge in 60px.
   * @property {string} 320 - The badge in 320px.
   */
  badge = { 60: null, 320: null };
  /**
   * Creates a new Platoon instance.
   *
   * @class
   * @param {GameClient} client
   * @param {object} data
   */
  constructor(client, data) {
    if (data) {
      this.structureData(data);
    }
  }
  /**
   * Structure the class using the data provided.
   *
   * @param {object} data - The data used to structure the class
   * @returns {User} the User
   */
  structureData(data) {
    utils.structureData(this, data, { blacklist: ["badgePath", ""] });

    var badgeUrl1 = (data.badgePath || data.emblemPath)
      .split("[FORMAT]")
      .join("png")
      .split("[SIZE]");

    this.badge[60] = badgeUrl1.join("60");
    this.badge[320] = badgeUrl1.join("320");
  }

  async fetch() {
    const res = await this.client.axios.get(`/platoon/${this.id}/`);

    this.structureData(this, res.data.context.platoon);

    this.isFan = res.data.context.isFan;
  }
}

module.exports.Platoon = Platoon;
