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
    origin: "https://kaushalam-to-do-app.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    limit: "32kb",
  })
);
//import router
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

export { app };
