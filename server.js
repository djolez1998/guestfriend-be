const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./schema/schema')
const cors = require('cors')
require('dotenv').config()

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
