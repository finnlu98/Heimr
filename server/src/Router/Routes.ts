import { Application, Request, Response, Router } from "express";
import BrokerRouter from "../Modules/Broker/BrokerRouter";
import StockRouter from "../Modules/Stock/StockRouter";

export class Routes {
    app: Application
    router: Router

    constructor(app: Application) {
        this.app = app
        this.router = Router();
        this.InitializeBaseEndpoint();
        this.RegisterRoutes();
    }

    InitializeBaseEndpoint() {
        this.router.get("", async (req: Request, res: Response) => {
            res.send("Server for Heimr. Lets get kicking")
        })
    }

    RegisterRoutes() {
        const broker = new BrokerRouter();
        const stock = new StockRouter();

        this.app.use("/", this.router)
        this.app.use("/api", broker.route)
        this.app.use("/api", stock.route)
    }
}