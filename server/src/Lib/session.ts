import session from "express-session";
import pg from "pg";
import connectPgSimple from "connect-pg-simple";

const PgSession = connectPgSimple(session);
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export const sessionMiddleware = session({
  name: "heimr.sid",
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
  store: new PgSession({
    pool,
    tableName: "sessions",
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 365 * 5,
  },
});
