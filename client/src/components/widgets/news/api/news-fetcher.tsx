import axios from "axios";
import configuration from "../../../../Configuration";
import { NewsResponse } from "../model/NewsResponse";
import FetcherHelper from "../../../../api/FetcherHelper";
import externalApiClient from "../../../../api/ExternalApiClient";

const NewsFetcher = async () => {
  const endpoint = configuration.getNewsConfig().NRK.Endpoint;

  const newsFetcher = new FetcherHelper<NewsResponse>(60 * 15 * 1000);
  const newsRes = await newsFetcher.getXmlData(
    NewsResponse.Identifier,
    async () =>
      (
        await externalApiClient.get<NewsResponse>(endpoint, {
          responseType: "text",
          meta: { loadingKey: "fetch-news" },
        })
      ).data,
  );
  return newsRes;
};

export default NewsFetcher;
