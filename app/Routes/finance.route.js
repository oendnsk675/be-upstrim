const finance = require('../Controllers/finance.controller.js')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()


module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // invoice
    // create
    router.get('/dashboard', [verifyToken], finance.getFinance)
    router.get('/balance', [verifyToken], finance.getBalance)

    app.use(default_router, router)
}