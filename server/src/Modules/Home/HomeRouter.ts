import BaseRouter from "../Common/BaseRouter";
import { Request, Response } from "express";
import { HomeFetcher } from "./HomeFetcher";

export class HomeRouter extends BaseRouter {
    fetcher: HomeFetcher
    constructor() {
        super("/home");
        this.fetcher = new HomeFetcher(0); // No caching
        this.setRoute()
    }
    
    setRoute(): void {
        this.route.post(this.subRoute, async (req: Request, res: Response) => {
            const headers = req.headers
            const {endpoint, selectedOption} = req.body
            this.fetcher.setEndpoint(endpoint)
            this.fetcher.setBody(selectedOption)

            const authorization = headers["homeauthorization"]
            if(authorization)
                this.fetcher.setHeader({authorization})

            const postRes = await this.fetcher.PostData() 

            res.send(postRes.data)

        })
    }

}