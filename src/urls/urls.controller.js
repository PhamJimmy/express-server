const urls = require("../data/urls-data");

const hasBodyProperty = (propertyName) => {
  const { data: { property } = {} } = req.body;
  property ? next() : next({ status: 400, message: `Need valid property: ${property}` })
}

let highestId = urls.reduce((currMaxId, url) => Math.max(currMaxId, url.id), 0)

const create = (req, res) => {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: ++highestId,
    href,
  }
  urls.push()
}

const list = (req, res) => {
  res.json({ data: urls });
}

module.exports = {
  create: [hasBodyProperty("href"), create],
  list,
}