const urls = require("../data/urls-data");

const list = (req, res) => {
  res.json({ data: urls });
}

module.exports = {
  list
}