import { Session, SessionData } from "express-session";
import BaseFetcherEndpoint from "../Common/BaseFetcherEndpoint";
import IntegrationService from "../Integration/IntegrationService";

export default class BrokerFetcher extends BaseFetcherEndpoint {
  private integrationService: IntegrationService;

  constructor(TTL: number) {
    super(TTL);
    this.integrationService = new IntegrationService();
  }

  formatHeader(session: Session & Partial<SessionData>, integration: string): any {
    const authorization = this.integrationService.getIntegration(session, integration);
    if (!authorization) return null;
    return { authorization };
  }
}
