const QuotesRepository = require('../repositories/quotes.repository.js')

const QuotesService = {
  findAll: ({ limit, startDate, endDate, hash }) => {
    return QuotesRepository.findAll({ limit, startDate, endDate, hash })
  }
}

module.exports = QuotesService