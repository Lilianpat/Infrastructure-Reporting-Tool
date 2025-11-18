const badgeRules = require("./badgeRules");
const { Report } = require("../models");

async function awardBadges(user) {
  const userBadges = user.badges || [];

  // Compute stats
  const totalReports = await Report.count({ where: { user_id: user.id } });
  const resolvedReports = await Report.count({
    where: { user_id: user.id, status: "Resolved" }
  });

  // Placeholder accuracy (you can implement later)
  const accuracy = 80;

  const stats = {
    reports: totalReports,
    accuracy: accuracy,
    impact: resolvedReports
  };

  let newBadges = [];

  for (const badge of badgeRules) {
    const value =
      badge.type === "reports"
        ? stats.reports
        : badge.type === "accuracy"
        ? stats.accuracy
        : stats.impact;

    const alreadyHas = userBadges.some((b) => b.id === badge.id);

    if (!alreadyHas && value >= badge.requirement) {
      newBadges.push({
        id: badge.id,
        name: badge.name,
        icon: badge.icon,
        earnedAt: new Date()
      });
    }
  }

  // If no new badges, return null
  if (newBadges.length === 0) return null;

  // Save badges
  user.badges = [...userBadges, ...newBadges];
  await user.save();

  return newBadges;
}

module.exports = awardBadges;
