const fs = require("fs");

const readHtml = (path) => {
  const data = fs.readFileSync(path, { encoding: "utf8" });
  return data;
};

module.exports = { readHtml };
