import { Request, Response } from "express";
import BaseRouter from "../Common/BaseRouter";
import BrokerFetcher from "./BrokerFetcher";

export default class BrokerRouter extends BaseRouter {
  fetcher: BrokerFetcher;

  constructor() {
    super("/broker");
    this.fetcher = new BrokerFetcher(60 * 60_000);
    this.setRoute();
  }

  setRoute(): void {
    this.route.post(this.subRoute, async (req: Request, res: Response) => {
      const sessionId = req.session.id;
      const { endpoint, integration } = req.body;

      if (typeof endpoint !== "string") {
        return res.status(400).send({ error: "Endpoint is required" });
      }

      if (integration && typeof integration === "string") {
        const auth = this.fetcher.formatHeader(req.session, integration);
        if (auth) this.fetcher.setHeader(auth);
        else
          return res
            .status(401)
            .send({ error: "Required authentication does not exist for the requested integration" });
      }

      this.fetcher.setEndpoint(endpoint);

      res.send(await this.fetcher.getData(`${sessionId}_${endpoint}`));
    });
  }
}
