const db = require("../../../data/dbConfig");

function find() {
  return db("users").select("*");
}

function findById(id) {
  return db("users").where("id", id).first("id", "username", "password", "email");
}

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .first("id", "username", "password", "email");
}

function findByEmail(email) {
    return db("users")
      .where("email", email)
      .first("id", "username", "password", "email");
  }

async function create(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  find,
  findById,
  findByEmail,
  findByUsername,
  create,
};
