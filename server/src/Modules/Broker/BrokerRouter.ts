import {Request, Response } from "express";
import { HeaderKeys } from "../Model/enum/HeaderKeys";
import BaseRouter from "../Common/BaseRouter";
import BrokerFetcher from "./BrokerFetcher";

export default class BrokerRouter extends BaseRouter {
    constructor() {
        super("/broker", new BrokerFetcher(60 * 60_000))
        this.setRoute();
    }

    setRoute(): void {
        this.route.post(this.subRoute, async (req: Request, res: Response) => {
            const { endpoint } = req.body;
            const headers = req.headers

            if (typeof endpoint === "string") {
                this.fetcher.setEndpoint(endpoint);
            }

            const authorization = headers[HeaderKeys.BrokerAuthorization.toString()]
            if(authorization)
                this.fetcher.setHeader({authorization})

            console.log(`Sending request to external api with the following url: ${endpoint}`)
            res.send(await this.fetcher.getData())
        })
    }
}