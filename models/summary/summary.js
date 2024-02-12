const { Summary } = require("./schema");

const getUserSummary = async (userId) => {
  return Summary.find({ userId });
};

const updateUserSummary = async (summariesToUpdate, dailyRate) => {
  if (summariesToUpdate) {
    summariesToUpdate.forEach((summary) => {
      if (summary.dailyRate > dailyRate) {
        const diff = summary.dailyRate - dailyRate;
        summary.dailyRate = dailyRate;
        summary.kcalLeft -= diff;
        summary.percentsOfDailyRate = (summary.kcalConsumed * 100) / dailyRate;
      }
      if (summary.dailyRate < dailyRate) {
        const diff = dailyRate - summary.dailyRate;
        summary.dailyRate = dailyRate;
        summary.kcalLeft += diff;
        summary.percentsOfDailyRate = (summary.kcalConsumed * 100) / dailyRate;
      }
      summary.save();
    });
  } else {
    summariesToUpdate = [];
  }

  return summariesToUpdate;
};

module.exports = {
  getUserSummary,
  updateUserSummary,
};
