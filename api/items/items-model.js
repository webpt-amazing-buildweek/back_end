const db = require("../../data/db-config")

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
};

function find(){
	return db("items")
		.select("*")
}

function findById(id) {
  return db('items')
    .where({ id })
    .first();
}

async function add(item) {
  const [id] = await db('items').insert(item).returning('id');
  return findById(id);
}

function remove(id) {
  return db('items')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('items')
    .where({ id })
    .update(changes, '*');
}
