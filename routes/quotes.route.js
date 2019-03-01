const { Router } = require('express')
const QuotesController = require('../controllers/quotes.controller.js')

const quotesRouter = new Router()

quotesRouter.get('/', QuotesController.getQuotes)

module.exports = quotesRouter