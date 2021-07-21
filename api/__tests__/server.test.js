const supertest = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const data = require('../dummyData/test_data')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3VzZXJuYW1lIjoiamltYm8iLCJpYXQiOjE2MTcwMzc2Mzh9.nhYSAG8vN9P3BVKs3H1_z_ul97idTz1fo7c4P3vFg98"


describe("user endpoint tests", () => {
  describe('[POST] /api/users/register', () => {
    
    it('creates a new user', async () => {
      const res = await supertest(server)
        .post('/api/users/register')
        .send({
          user_username: 'kimbo',
          user_email: 'kimbo@slice.com',
          user_password: 'slice'
        })
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.user_id).toBeDefined()
      expect(res.body.user_username).toBe('kimbo')
    })
  })

  describe('[POST] /api/users/login', () => {
    
    it('logs in user', async () => {
      const res = await supertest(server)
        .post('/api/users/login')
        .set('authorization', authToken)
        .send({
          user_username: 'jimbo',
          user_email: 'jimbo@slice.com',
          user_password: 'abc1234'
        })
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe("application/json")
      expect(res.body.message).toBe(`jimbo is back!`)
    })
  })
})
//     it('gives correct error if registrations details invalid', async () => {
//       const res = await supertest(server)
//         .post('/api/users/register')
//         .send({
//           user_username: '',
//           user_email: '',
//           user_password: 'hi there'
//         })
//         expect(res.statusCode).toBe(404)
//         expect(res.body.message).toBe('username, email, and password required')
//     })
//   })
//   describe('[GET] /api/users/:id', () => {
//     it('returns the correct user details', async () => {
//       const res = await supertest(server)
//         .get('/api/users/1')
//       expect(res.statusCode).toBe(200)
//       expect(res.body.user_username).toBe()
//         })
//     })
// })

//RECIPE TESTS

describe('RECIPE TESTS', () => {

  describe('[GET] /api/recipes', () => {
    it('returns the correct recipes', async () => {
      const res = await supertest(server)
        .get('/api/recipes')
        .set('authorization', authToken)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body[0].recipe_name)
        .toBe("Blistered Green Beans with Garlic")
      expect(res.body[0].ingredients.length).toBe(6)
      expect(res.body.length).toBe(2)
    })
  })

  describe('[GET] /api/recipes/:id', () => {
    it('returns the correct recipes', async () => {
      const res = await supertest(server)
        .get('/api/recipes/1')
        .set('authorization', authToken)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.recipe_name)
        .toBe("Blistered Green Beans with Garlic")
      expect(res.body.ingredients.length).toBe(6)
    })
    it('provides proper error if id does not exist', async () => {
      const res = await supertest(server)
        .get('/api/recipes/100')
        .set('authorization', authToken)
      expect(res.statusCode).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('recipe does not exist')
    })
  })
  
  describe('[POST] /api/recipes', () => {
    it('adds recipe correctly', async () => {
      const res = await supertest(server)
        .post('/api/recipes')
        .set('authorization', authToken)
        .send(data.newRecipe)
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body.recipe_name).toBe('Test Dish')
    })
  })

  describe('[PUT] /api/recipes/:id', () => {
    it('updates recipe correctly', async () => {
      const res = await supertest(server)
        .put('/api/recipes/1')
        .set('authorization', authToken)
        .send(data.updatedRecipe)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.recipe_name).toBe('Update Test')
    })
    it('provides proper error if recipe name missing', async () => {
      const res = await supertest(server)
        .put('/api/recipes/1')
        .set('authorization', authToken)
        .send({
          ...data.updatedRecipe,
          recipe_name: ''
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('missing recipe name')
    })
    it('provides proper error if recipe description missing', async () => {
      const res = await supertest(server)
        .put('/api/recipes/1')
        .set('authorization', authToken)
        .send({
          ...data.updatedRecipe,
          recipe_description: ''
        })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toBe('missing recipe description')
    })
    it('provides proper error if id does not exist', async () => {
      const res = await supertest(server)
      .put('/api/recipes/100')
      .set('authorization', authToken)
      .send(data.updatedRecipe)
      expect(res.statusCode).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('recipe does not exist')
    })
  })

  describe('[DELETE] /api/recipes/:id', () => {
    it('updates recipe correctly', async () => {
      const res = await supertest(server)
        .delete('/api/recipes/1')
        .set('authorization', authToken)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('recipe successfully deleted')
    })
    it('provides proper error if id does not exist', async () => {
      const res = await supertest(server)
        .delete('/api/recipes/100')
        .set('authorization', authToken)
      expect(res.statusCode).toBe(401)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('recipe does not exist')
    })
  })

})
