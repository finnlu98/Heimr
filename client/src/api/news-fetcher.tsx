import axios from "axios";
import configuration from "../Configuration"
import { NewsResponse } from "../model/Deziarilize/News";
import FetcherHelper from "./fetcher/FetcherHelper";

const NewsFetcher = async () => {

    const endpoint = configuration.getNewsConfig().NRK.Endpoint;

    const newsFetcher = new FetcherHelper<NewsResponse>(60 * 15 * 1000);
    const newsRes = await newsFetcher.getXmlData(NewsResponse.Identifier, async () => (await axios.get<NewsResponse>(endpoint, { responseType: "text" })).data)
    return newsRes;
} 

export default NewsFetcher