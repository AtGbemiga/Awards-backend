// import express
import express from "express";
const app = express();

// import cors
import cors from "cors";

// import dotenv
import dotenv from "dotenv";
dotenv.config();

// use cors
app.use(cors());

// use express.json
app.use(express.json());

// use urlencoded
app.use(express.urlencoded({ extended: true }));

// import the route
import postsRouter from "./routes/post";
import commentsRouter from "./routes/comments";
import nominateRouter from "./routes/nominate";

// create paths and use the imported routes
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/nominate", nominateRouter);

// start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}...`);
});
