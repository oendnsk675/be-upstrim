const { createWalletAccount, getWalletAccount, active } = require('../Controllers/wallet.controller')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {

    const router = express.Router()

    router.post("/wallet", [verifyToken], createWalletAccount)
    router.patch("/wallet/active", [verifyToken], active)
    router.get("/wallet", [verifyToken], getWalletAccount)

    app.use(default_router, router)
}