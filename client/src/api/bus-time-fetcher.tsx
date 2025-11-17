import axios from "axios";
import {TravelResponse} from "../model/Deziarilize/TravelResponse";
import Configuration from "../Configuration";
import FetcherHelper from "./fetcher/FetcherHelper";

    const FetchBustimes = async (fromPlace: string, toPlace: string) => {
    
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
            
            const config = Configuration.getEnturConfig()
            const endpoint = config.Endpoint;

            const fetcher = new FetcherHelper<TravelResponse>(60 * 6 * 1000)

            const res = fetcher.getData(TravelResponse.Identifier, async () => {
                const response = await axios.post<TravelResponse>(
                endpoint,
                { query: graphqlQuery },
                { headers: { "ET-Client-Name": config.Identifier } }
              );
        
              return response.data;
            })

            return res;
            ;
          } catch (error) {
            console.error("GraphQL request error:", error);
            throw error;
          }
    }

export default FetchBustimes