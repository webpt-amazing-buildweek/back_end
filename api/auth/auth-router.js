  
const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Auth = require("./auth-model")
const {JWT_SECRET} = require('./secrets/secrets')

function isDefined(value) {
	return value !== null && value !== undefined // will return true if the value is defined
}

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, email, isOwner } = req.body
		if(!username || !password || !email || !isDefined(isOwner)){
			return res.status(400).json({
				message: "username, password, and email, member status required"
			})
		} else {
			const  hashpass = await bcrypt.hash(password, 5)
			const newUser = await Auth.add({
				username: username,
				password: hashpass,
				email: email,
				isOwner: isOwner

			})
			res.status(201).json(newUser)
		}
	} catch (err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		console.log("in the try")
		const userObject = req.body
		if(!username || !password){
			return res.status(400).json({
				message: "username and password required"
			})
		}
		const user = await Auth.findBy({ username }).first()
		const checkPassword = await bcrypt.compare(password,user.password)

		if (!user){
			console.log("in the if")
			return res.status(401).json({
				message: "username or password incorrect"
			})
		} else {
			console.log("in the else")
			const token = jwt.sign({
				subject: user.id,
				username: user.username
			}, JWT_SECRET, {expiresIn: "1d"})
			

			res.cookie("token", token)
			console.log("past the cookie")

			res.status(200).json({
				message: `Welcome back ${username}!`,
				token: token,
				user: userObject
			})
		}
		
	} catch (err) {
		console.log("in the catch")
		next(err)
	}
})

router.post("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err){
				next(err)
			} else {
				res.status(204).end()
			}
		})
		
	} catch (err) {
		next(err)
	}
})

module.exports = router