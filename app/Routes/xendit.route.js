const XenditController = require('../Controllers/xendit.controller.js')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // invoice
    // create
    router.post('/invoice', [verifyToken], XenditController.createInvoice)
    router.post('/invoice/callback', XenditController.invoiceCallback)

    router.post('/disbursement', [verifyToken], XenditController.disbursement)
    router.post('/disbursement/callback', XenditController.disbursementCallback)

    app.use(default_router, router)
}