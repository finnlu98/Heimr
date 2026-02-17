import { TravelRoute } from "../TravelCardWidget";
import { TravelResponse } from "./TravelResponse";

export class BusData {
  constructor(travelResponse: TravelResponse, travelRoute: TravelRoute) {
    this.travelResponse = travelResponse;
    this.travelRoute = travelRoute;
  }

  travelResponse!: TravelResponse;
  travelRoute!: TravelRoute;
}
