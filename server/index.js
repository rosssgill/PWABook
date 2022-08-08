import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const DB_CONNECTION_URL =
  "mongodb+srv://rosssgill:rosssgill123@cluster0.kwhyjri.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
