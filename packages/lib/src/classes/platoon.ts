import type { AxiosInstance } from "axios";
import * as utils from "../utils";
import type { GameClient } from "./gameclient";
/**
 * Represents a platoon.
 */
export class Platoon {
  /**
   * The id of the platoon.
   */
  id: string;

  client: GameClient;
  badgePath: string;
  axios: AxiosInstance;
  /**
   * Creates a new Platoon instance.
   *
   * @param client - The client of this instance
   * @param data - Initial data of this instance
   */
  constructor(client: GameClient, data: Platoon | string) {
    if (data) {
      if (typeof data === "string") {
        this.id = data;
      } else {
        this.structureData(data);
      }
    }
  }
  isFan: boolean;
  allowNewMember: boolean;

  members: [];
  badge: {
    "60": string;
    "320": string;
  };
  /**
   * Structure the platoon instance using the data provided.
: [ ]
   * @param  data - The data used to structure the platoon instance.
   * @returns the platoon
   */
  structureData(data: Platoon): Platoon {
    utils.structureData(this, data);
    if (data.badgePath) {
      var badgeUrl1: string | Array<string> = data.badgePath;

      badgeUrl1 = badgeUrl1.split("[FORMAT]").join("png").split("[SIZE]");

      this.badge[60] = badgeUrl1.join("60");
      this.badge[320] = badgeUrl1.join("320");
    }
    return this;
  }
  /**
   * Fetch the data of the platoon from Battlelog.
   *
   * @returns The platoon instance
   */
  async fetch(): Promise<Platoon> {
    const res = await this.client.axios.get(`/platoon/${this.id}/`);

    this.structureData(res.data.context.platoon);

    this.isFan = res.data.context.isFan;

    return this;
  }
}
