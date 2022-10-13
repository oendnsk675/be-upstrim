const UserController = require('../Controllers/user.controller.js')
const {verifyToken} = require('../middlewares/auth.jwt')
const {emailUnique, usernameUnique} = require('../middlewares/user_validation')
require('dotenv').config()

module.exports = (express, app, default_router = '/api') => {
    const router = express.Router()

    // auth
    router.post('/signup', [emailUnique, usernameUnique] , UserController.signUp)
    router.post('/signin', UserController.signIn)

    router.get('/test', function(req, res){
        console.log("hit");
        res.status(200).json({
            "msg": 'nice'
        })
    })


    router.get('/users', [verifyToken], UserController.getAllUser)
    router.get('/profile', [verifyToken], UserController.getProifile) // data spesifc his self
    router.get('/users/:id', [verifyToken], UserController.getDetailUser)
    router.put('/users', [verifyToken], UserController.updateUser)

    app.use(default_router, router)
}