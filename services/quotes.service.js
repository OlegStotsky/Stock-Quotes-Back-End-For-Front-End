const QuotesRepository = require('../repositories/quotes.repository.js')

const QuotesService = {
  findAll: ({ limit, startDate, endDate }) => {
    return QuotesRepository.findAll({ limit, startDate, endDate })
  }
}

module.exports = QuotesService