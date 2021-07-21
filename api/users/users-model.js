const db = require('../data/db-config')

function find() {
  return db("users").select("*")
}

function findBy(filter) {
  return db("users")
    .select("user_id", "user_username", "user_email", "user_password")
    .where(filter)
}

function findById(user_id) {
  return db("users")
		.select("user_id", "user_username", "user_email")
		.where({ user_id })
		.first()
}

async function add(user) {
  const [id] = await db("users").insert(user).returning("user_id")
	return findById(id)
}


module.exports = {
	find,
	findBy,
	findById,
  add,
}