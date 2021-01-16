const axios = require("axios").default;

function dayDiff(d2, d1) {
  const delta = new Date(d2) - new Date(d1);
  return (delta / 1000 / 60 / 60 / 24).toFixed(0);
}

module.exports = async function scrape() {
  const res = await axios.get(
    "https://tanifund.com/api/v2/projects?page=1&itemsPerPage=6&sort=-cutoffAt&projectStatusIds[]=6&projectStatusIds[]=5"
  );
  return res.data.data.items.map((item) => ({
    id: item.projectNo,
    title: item.title,
    link: `https://tanifund.com/project/${item.urlSlug}`,
    interest: item.interestTarget,
    startAt: item.startAt,
    endAt: item.endAt,
    duration: dayDiff(item.endAt, item.startAt),
    returnType: item.returnPeriod.description,
  }));
};
