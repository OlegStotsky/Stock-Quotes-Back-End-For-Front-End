const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const helmet = require('helmet')

const app = express()

app.use(bodyParser.json())
app.use(helmet())

routes(app)

module.exports = app