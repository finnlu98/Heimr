import { Request, Response } from "express";
import { HeaderKeys } from "../../Model/enum/HeaderKeys";
import BaseRouter from "../Common/BaseRouter";
import BrokerFetcher from "./BrokerFetcher";
import IFethcerEndpoint from "../../Model/Interface/IFethcerEndpoint";

export default class BrokerRouter extends BaseRouter {
  fetcher: IFethcerEndpoint;

  constructor() {
    super("/broker");
    this.fetcher = new BrokerFetcher(60 * 60_000);
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(this.subRoute, async (req: Request, res: Response) => {
      const sessionId = req.session.id;
      const { endpoint } = req.body;
      const headers = req.headers;

      if (typeof endpoint !== "string") {
        return res.status(400).send({ error: "Endpoint is required" });
      }

      this.fetcher.setEndpoint(endpoint);

      const authorization = headers[HeaderKeys.BrokerAuthorization.toString()];
      if (authorization) this.fetcher.setHeader({ authorization });

      res.send(await this.fetcher.getData(`${sessionId}_${endpoint}`));
    });
  }
}
