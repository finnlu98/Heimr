import axios from "axios";
import moment from "moment";

const FetchElectricityPrices = async () => {
  try {
    const year = moment().year();
    const month =  moment().format('MM');
    const day = moment().format('DD');

    const response = await axios.get<ElectricityPrice[]>(
      `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO5.json`
    );

    return response.data; 
  } catch (error) {
    console.error("Can't get electrictyprices quote");
    throw error;
  }
}

export default FetchElectricityPrices
