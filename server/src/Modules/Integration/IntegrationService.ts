import { Session, SessionData } from "express-session";
import { encrypt, decrypt } from "../../Lib/encryption";

declare module "express-session" {
  interface SessionData {
    integrations?: { [provider: string]: string };
  }
}

export default class IntegrationService {
  setIntegration(session: Session & Partial<SessionData>, provider: string, key: string): boolean {
    if (provider && key) {
      if (!session.integrations) {
        session.integrations = {};
      }
      session.integrations[provider] = encrypt(key);
      return true;
    }
    return false;
  }

  getIntegration(session: Session & Partial<SessionData>, provider: string): string | null {
    const encryptedKey = session.integrations?.[provider];
    return encryptedKey ? decrypt(encryptedKey) : null;
  }
}
