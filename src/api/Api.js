import axios from "axios";


const fetchData = async (fromPlace, toPlace) => {
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

    const response = await axios.post(
      endpoint,
      { query: graphqlQuery },
      { headers: { "ET-Client-Name": "FinnGriggsProduksjoner-Villaveien" } }
    );

    return response.data;
  } catch (error) {
    console.error("GraphQL request error:", error);
    throw error;
  }
};


const fetchNhhBusRides = async () => {
    return fetchData("NSR:StopPlace:6274", "NSR:StopPlace:62019")
}

const fetchCenterBusRides = async () => {
  return fetchData("NSR:StopPlace:6258", "NSR:StopPlace:6323")
}



export default {
  fetchNhhBusRides,
  fetchCenterBusRides
};
