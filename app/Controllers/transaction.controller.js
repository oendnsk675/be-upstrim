const {Transaction} = require('../models')

const createTransaction = (data) => {
    data.status = "PROGRESS"
    try {
        const result = Transaction.create(data)
        return {
            status: true,
            result
        }
    } catch (error) {
        return {
            status: false,
            msg: error
        }
    }
}

module.exports = {
    createTransaction
}