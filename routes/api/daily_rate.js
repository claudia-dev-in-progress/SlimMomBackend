const express = require("express");
const getDailyRate = require("./../../models/daily_rate/daily_rate");
const { getNotAllowedProducts } = require("./../../models/products/products");
const {
  getUserSummary,
  updateUserSummary,
} = require("../../models/summary/summary");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { height, weight, age, desiredWeight, bloodType } = req.body;
  const { userId } = req.params;
  const dailyRate = getDailyRate(weight, height, age, desiredWeight);
  const notAllowedProducts = getNotAllowedProducts(bloodType);

  if (!userId) {
    return res.status(200).send({ dailyRate, notAllowedProducts });
  }

  const summariesToUpdate = getUserSummary(userId);
  const updateSumaries = updateUserSummary(summariesToUpdate, dailyRate);

  return res.status(200).send({
    dailyRate,
    summaries: updateSumaries,
    id: userId,
    notAllowedProducts,
  });
});

module.exports = router;
