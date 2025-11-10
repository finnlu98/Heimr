import axios from "axios";
import configuration from "../Configuration";
import { HomeStatus } from "../model/Deziarilize/HomeStatus";

const HomeFetcher = async (entityId: string) => {
    try {

        var config = configuration.getHomeAssistantConfig()
        var endpoint = `${config.Endpoint}/person.${entityId}`
        const response = await axios.get<HomeStatus>(
            endpoint, { headers: { "Authorization": `Bearer ${config.secret_token}`, "Content-Type": "text/plain" } }
        );

        return response.data; 
    } catch (error) {
        console.error("Can't get Home Assistant data");
        throw error;
    }
}

export default HomeFetcher