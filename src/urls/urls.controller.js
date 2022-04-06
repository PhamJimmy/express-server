const urls = require("../data/urls-data");
const uses = require("../data/uses-data")

const hasBodyProperty = (propertyName) => {
  return (req, res, next) => {
    const { data = {} } = req.body;
    data[propertyName] ? next() : next({ status: 400, message: `Need valid property: ${propertyName}` })
  }
}

const urlExists = (req, res, next) => {
  const { urlId } = req.params;
  const foundUrl = urls.find((url) => url.id === Number(urlId));

  if (foundUrl) {
    res.locals.url = foundUrl;
    next();
  } else {
    next({
      status: 404,
      message: `Url ID does not exist: ${urlId}`
    })
  }
}

let maxUrlsId = urls.reduce((currMaxId, url) => Math.max(currMaxId, url.id), 0)

const create = (req, res) => {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: ++maxUrlsId,
    href,
  }
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

let maxUsesId = uses.reduce((currMaxId, use) => Math.max(currMaxId, use.id), 0);

const read = (req, res) => {
  const url = res.locals.url;
  const newUse = {
    id: ++maxUsesId,
    urlId: url.id,
    time: Date.now(),
  }
  uses.push(newUse);
  res.json({ data: url });
}

const update = (req, res) => {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;
  url.href = href;
  res.json({ data: url });
}

const list = (req, res) => {
  res.json({ data: urls });
}

module.exports = {
  create: [hasBodyProperty("href"), create],
  read: [urlExists, read],
  update: [urlExists, hasBodyProperty("href"), update],
  list,
  urlExists
}