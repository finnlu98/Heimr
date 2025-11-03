import axios from "axios";
import TravelResponse from "../../model/Deziarilize/TravelResponse";

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
            
            const endpoint = "https://api.entur.io/journey-planner/v3/graphql";
        
            const response = await axios.post<TravelResponse>(
              endpoint,
              { query: graphqlQuery },
              { headers: { "ET-Client-Name": "FinnGriggsProduksjoner" } }
            );
        
            return response.data;
          } catch (error) {
            console.error("GraphQL request error:", error);
            throw error;
          }
    }

export default FetchBustimes