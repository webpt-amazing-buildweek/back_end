const express = require('express')
const helmet = require('helmet')
const usersRouter = require('./users/users-router')

const cors = require('cors')



const server = express()
server.use(express.json())
server.use(helmet())

server.use(cors({ 
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE']
}))

server.options('*', cors())


// server.use(cookieParser())
server.get('/', (req, res) => {
    res.json({message: 'African Spice Market is all 200s and blue skies'})
})
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { //eslint-disable-line
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})


module.exports = server
