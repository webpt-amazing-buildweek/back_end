const db = require("../../data/db-config")

function find(){
	return db("users")
		.select("*")
}

function findBy(filter){
	console.log(filter)
	return db("users")
		.select("*")
		.where(filter)
}

function findById(id){
	console.log("in the model findById", id)
	return db("users")
		.select("*")
		.where({ id })
		.first()
}

async function add(user){
	console.log("in the model add", user)
	const [id] = await db("users").insert(user).returning("id")
	console.log(id)
	return findById(id);
}

module.exports = {
	find,
	findBy,
	findById,
	add,
}