import express, { type Express } from "express";
import router from "./routes/main.js";
import cors from "cors";

const allowedOrigins = [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
];
const app: Express = express();

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: "Content-Type, Authorization"
}));

app.use('/cashflow-api', router);

app.get("/", (_, res) => {
    res.send("Cashflow API");
});

export default app;