import "dotenv/config";
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from "./configs/db.js";
import router from "./routes/index.js";
import morgan from "morgan";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
await connectDB();

//Allow multiple origins
app.use(cors({
    origin: [process.env.FRONTEND_URL, "https://laptop93.site", "http://localhost"],
    methods: ["POST", "PATCH", "GET", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", router);
const __dirname = path.resolve();
app.use("/uploads/files", express.static(`${__dirname}/uploads/files`));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/dist')));
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    });
}
// app.use(routeNotFound);
// app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})