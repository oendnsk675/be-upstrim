const MidtransController = require('../Controllers/midtrans.controller')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // invoice
    // create
    router.post('/invoice', [verifyToken], MidtransController.createInvoice)
    router.post('/invoice/callback', MidtransController.invoiceCallback)

    router.post('/payouts', [verifyToken], MidtransController.createPayout)
    // router.post('/payout/callback', MidtransController.payoutCallback)

    app.use(default_router, router)
}