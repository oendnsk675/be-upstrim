const XenditController = require('../Controllers/xendit.controller.js')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // invoice
    // create
    router.post('/invoice', XenditController.create)

    app.use(default_router, router)
}