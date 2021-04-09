const utils = require("../utils/utils");

class Platoon {
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

  badge = {};
  /**
   * Structure the class using the data provided.
   *
   * @param {object} data - The data used to structure the class
   * @returns {User} the User
   */
  structureData(data) {
    utils.structureData(this, data, { blacklist: ["badgePath"] });

    var badgeUrl1 = data.badgePath || data.emblemPath;

    if (badgeUrl1) {
      badgeUrl1 = badgeUrl1.split("[FORMAT]").join("png").split("[SIZE]");

      this.badge[60] = badgeUrl1.join("60");
      this.badge[320] = badgeUrl1.join("320");
    }
  }

  async fetch() {
    const res = await this.client.axios.get(`/platoon/${this.id}/`);

    this.structureData(this, res.data.context.platoon);

    this.isFan = res.data.context.isFan;
  }
}

module.exports.Platoon = Platoon;
