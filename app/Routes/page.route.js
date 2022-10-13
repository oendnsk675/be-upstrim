const { getMyPage, updatePage, getPage, createPage, deletePage } = require('../Controllers/page.controller')
const {verifyToken} = require('../middlewares/auth.jwt')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    router.get('/my-page', [verifyToken], getMyPage) // get all page
    router.get('/page/:id_page', getPage) // get spesific page
    router.post('/my-page', [verifyToken], createPage)
    router.put('/my-page', [verifyToken], updatePage)
    router.delete('/my-page/:id_page', [verifyToken], deletePage)
    
    app.use(default_router, router)
}