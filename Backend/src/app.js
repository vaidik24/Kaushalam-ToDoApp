import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  express.json({
    limit: "32kb",
  })
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    limit: "32kb",
  })
);
//import router

export { app };
