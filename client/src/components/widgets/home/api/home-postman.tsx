import configuration from "../../../../Configuration";
import axios from "axios";

const HomePostMan = async (event: string, selectedOption?:string) => {
    try {
        var config = configuration.getHomeAssistantConfig();
        var endpoint = process.env.REACT_APP_HEIMR_ENDPOINT ?? ""
        endpoint = endpoint + "home"
        var homeEndpoint = `${config.Endpoint}events/${event}`
        
        const response = await axios.post(
            endpoint, {endpoint: homeEndpoint, selectedOption: selectedOption}, { headers: { "HomeAuthorization": `Bearer ${config.secretToken}`} }
        );

        return response;

    } catch (error) {
        console.error("Can`t post Home assistant data")
    }
}

export default HomePostMan