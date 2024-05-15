require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDB = require("./uttils/db");
const errorMiddleware = require("./middleware/error-middleware");
const adminRouter = require("./router/admin-route");

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).send("welcome to shivam world");
// });

app.use("/", router);
app.use("/admin", adminRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
