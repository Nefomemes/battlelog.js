import type { AxiosInstance } from "axios";
import * as utils from "../utils";
import type { GameClient } from './gameclient';
export class Platoon {
  
  id: string;

  client: GameClient;

  axios: AxiosInstance;
  /**
   * Creates a new Platoon instance.
   *
   * @class
   * @param client
   * @param data
   */
  constructor(client: GameClient, data: Platoon | string) {
    if (data && typeof data === "string") {
      this.id = data;
    } else {
      this.structureData(data);
    }
  }
  isFan: boolean;
  allowNewMember: boolean;
  badge: {
    '60': string,
    '320': string
    };
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
    return this;
  }

  async fetch() {
    const res = await this.client.axios.get(`/platoon/${this.id}/`);

    this.structureData(res.data.context.platoon);

    this.isFan = res.data.context.isFan;

    return this;
  }
}

module.exports.Platoon = Platoon;
