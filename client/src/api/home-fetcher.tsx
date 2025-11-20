import axios from "axios";
import configuration from "../Configuration";
import { HomeStatus } from "../model/Deziarilize/HomeStatus";

export const HomeFetcher = async (entityId: string) => {
    try {

        var config = configuration.getHomeAssistantConfig()
        
        var endpoint = `${config.Endpoint}states/person.${entityId}`
        const response = await axios.get<HomeStatus>(
            endpoint, { headers: { "Authorization": `Bearer ${config.secretToken}`, "Content-Type": "text/plain" } }
        );

        return response.data; 
    } catch (error) {
        console.error("Can't get Home Assistant data");
        throw error;
    }
}

export const HomePostMan = async (event: string) => {
    try {
        var config = configuration.getHomeAssistantConfig();
        var endpoint = process.env.REACT_APP_HEIMR_ENDPOINT ?? ""
        endpoint = endpoint + "home"
        var homeEndpoint = `${config.Endpoint}events/${event}`

        const response = await axios.post<HomeStatus>(
            endpoint, {endpoint: homeEndpoint}, { headers: { "HomeAuthorization": `Bearer ${config.secretToken}`} }
        );

        return response;

    } catch (error) {
        console.error("Can`t post Home assistant data")
    }
}
