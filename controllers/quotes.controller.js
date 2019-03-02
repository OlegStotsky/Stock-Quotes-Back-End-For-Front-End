const QuotesService = require('../services/quotes.service.js')

const QuotesController = {
  getQuotes: async (req, res) => { 
    const DEFAULT_LIMIT = Number.MAX_SAFE_INTEGER
    const DEFAULT_START_DATE = 0
    const DEFAULT_END_DATE = Number.MAX_SAFE_INTEGER
    const DEFAULT_HASH = ''

    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const startDate = Number(req.query.start_date) || DEFAULT_START_DATE 
    const endDate = Number(req.query.end_date) || DEFAULT_END_DATE
    const hash = req.query.hash || DEFAULT_HASH

    const quotes = await QuotesService.findAll({ limit, startDate, endDate, hash })

    return res.status(200).json({ data: quotes })
  }
}

module.exports = QuotesController