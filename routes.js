const quotesRoutes = require('./routes/quotes.route.js')

module.exports = (app) => {
  app.use('/quotes', quotesRoutes)
}