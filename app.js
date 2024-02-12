const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const productsRouter = require("./routes/api/products");
const dailyRateRouter = require("./routes/api/daily_rate");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/auth_config");

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api", dailyRateRouter);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
