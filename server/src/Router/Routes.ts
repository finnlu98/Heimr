import { Application, Request, Response, Router } from "express";
import BrokerRouter from "../Modules/Broker/BrokerRouter";
import StockRouter from "../Modules/Stock/StockRouter";
import { HomeActionsRouter } from "../Modules/HomeActions/HomeActionsRouter";
import { UserRouter } from "../Modules/User/UserRouter";
import AuthorizationRouter from "../Modules/Authorization/AuthorizationRouter";
import HomeRouter from "../Modules/Home/HomeRouter";

export class Routes {
  app: Application;
  router: Router;

  constructor(app: Application) {
    this.app = app;
    this.router = Router();
    this.InitializeBaseEndpoint();
    this.RegisterRoutes();
  }

  InitializeBaseEndpoint() {
    this.router.get("", async (req: Request, res: Response) => {
      res.send("Backened server for Heimr dashboard. Lets get building!👷🏼‍♂️");
    });
  }

  RegisterRoutes() {
    const broker = new BrokerRouter();
    const stock = new StockRouter();
    const homeActions = new HomeActionsRouter();
    const user = new UserRouter();
    const auth = new AuthorizationRouter();
    const home = new HomeRouter();

    this.app.use("/", this.router);
    this.app.use("/api", broker.route);
    this.app.use("/api", stock.route);
    this.app.use("/api", homeActions.route);
    this.app.use("/api", user.route);
    this.app.use("/api", auth.route);
    this.app.use("/api", home.route);
  }
}
