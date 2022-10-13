require('dotenv')
const axios = require('axios')

module.exports = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.MIDTRANS_DEV : process.env.MIDTRANS_PROD,
    headers: {
      'Accept': 'application/json',
      'Authorization': process.env.MIDTRANS_KEY
    }
})