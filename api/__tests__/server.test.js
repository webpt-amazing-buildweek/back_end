//const supertest = require('supertest')
//const server = require('../server')
const db = require('../data/db-config')
//const data = require('../dummyData/test_data')

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

//const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX3VzZXJuYW1lIjoiamltYm8iLCJpYXQiOjE2MTcwMzc2Mzh9.nhYSAG8vN9P3BVKs3H1_z_ul97idTz1fo7c4P3vFg98"

