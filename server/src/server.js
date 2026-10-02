import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();

/* ---------- Security ---------- */
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

/* ---------- Parsers ---------- */
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(env.cookieSecret));

/* ---------- Logging ---------- */
if (!env.isProd) app.use(morgan('dev'));

/* ---------- Performance ---------- */
app.use(compression());

/* ---------- Trust proxy (for rate limiting behind reverse proxy) ---------- */
app.set('trust proxy', 1);

/* ---------- Routes ---------- */
app.use('/api', routes);
app.get('/', (_req, res) =>
  res.json({ success: true, message: 'GlobalPath Visa Consultancy API' })
);

/* ---------- 404 + Errors ---------- */
app.use(notFound);
app.use(errorHandler);

/* ---------- Boot ---------- */
async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
    console.log(`📦 Environment: ${env.nodeEnv}`);
  });
}

start();