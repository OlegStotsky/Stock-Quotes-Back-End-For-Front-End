const { EventEmitter } = require('events')

class QuotesSubscription extends EventEmitter {
  constructor(connection) {
    super()
    this.connection = connection
  }

  async init() {
    const channel = await this.connection.createChannel()

    const queueAssertion = channel.assertQueue('quotes')

    return channel.consume('quotes', msg => {
      const quotes = JSON.parse(msg.content)

      this.emit('new_quotes', quotes)
    })
  }
}

module.exports = QuotesSubscription