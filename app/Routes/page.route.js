const { getMyPage, createOrUpdatePage, getPage } = require('../Controllers/page.controller')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    router.get('/my-page', [verifyToken], getMyPage)
    router.get('/page/:username', getPage)
    router.post('/my-page', [verifyToken], createOrUpdatePage)
    
    app.use(default_router, router)
}