import { TravelResponse } from "../model/TravelResponse";
import Configuration from "../../../../Configuration";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";
import { TravelRoute } from "../TravelCardWidget";
import { BusData } from "../model/BusData";

class BusApi extends BaseWidgetApi {
  async getBusTimes(travelRoutes: TravelRoute[]): Promise<BusData[] | undefined> {
    const busTimes: BusData[] = [];

    for (const route of travelRoutes) {
      try {
        const busTime = await this.fetchBusTimes(route.startPlace.properties.id, route.stopPlace.properties.id);
        busTimes.push(new BusData(busTime, route));
      } catch (error) {
        console.error(
          `Error fetching bus times for route from ${route.startPlace.properties.id} to ${route.stopPlace.properties.id}:`,
          error,
        );
      }
    }
    return busTimes;
  }

  private async fetchBusTimes(fromPlace: string, toPlace: string): Promise<TravelResponse> {
    try {
      const graphqlQuery = `
               {
                 trip(
                   from: {
                     place: "${fromPlace}"       
                   },
                   to: {
                     place: "${toPlace}" 
                   },
                   maximumTransfers: 1
                 ) {
                   tripPatterns {
                     duration
                     legs {
                       expectedStartTime
                       expectedEndTime
                       mode
                       distance
                       fromPlace {
                         name
                       }
                       toPlace {
                         name
                       }
                       line {
                         id
                         publicCode
                         name
                       }
                     }
                   }
                 }
               }
             `;

      const config = Configuration.getEnturConfig();
      const endpoint = config.TravelPlanner.Endpoint;
      const identifier = Configuration.getIdentifierConfig();

      return await this.postJson<TravelResponse>(
        endpoint,
        { headers: { "ET-Client-Name": identifier } },
        { query: graphqlQuery },
        "fetch-bus-card",
      );
    } catch (error) {
      console.error("GraphQL request error:", error);
      throw error;
    }
  }
}

export const busApi = new BusApi();
