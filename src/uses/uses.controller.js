const uses = require("../data/uses-data");

const useExists = (req, res, next) => {
  const { useId } = req.params;
  const foundUse = uses.find((use) => use.id === Number(useId));
  if (foundUse) {
    res.locals.use = foundUse;
    next();
  } else {
    next({
      status: 404,
      message: `Use ID not found: ${useId}`
    })
  }
}

let maxUsesId = uses.reduce((currMaxId, use) => Math.max(currMaxId, use.id), 0)

const create = (req, res) => {
  const { data: { href, id } = {} } = req.body; 
  const newUse = {

  }
}

const read = (req, res) => {
  const use = res.locals.use;
  res.json({ data: use })
}

const destroy = (req, res) => {
  use = res.locals.use;
  const index = uses.findIndex((useEl) => useEl.id === use.id);
  uses.splice(index, 1);
  res.status(204).json({ data: { use } })
}

const list = (req, res) => {
  const { urlId } = req.params;
  res.json({ data: uses.filter((use) => urlId ? use.urlId === Number(urlId) : true ) })
}

module.exports = {
  create,
  read: [useExists, read],
  delete: [useExists, destroy],
  list
}