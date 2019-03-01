const QuotesRepository = require('../repositories/quotes.repository.js')

const QuotesService = {
  findAll: ({ limit }) => {
    return QuotesRepository.findAll({ limit })
  }
}

module.exports = QuotesService