const QuotesService = require('../services/quotes.service.js')

const QuotesController = {
  getQuotes: async (req, res) => {
    const limit = Number(req.query.limit)
      
    const quotes = await QuotesService.findAll({ limit })

    return res.status(200).json({ data: quotes })
  }
}

module.exports = QuotesController