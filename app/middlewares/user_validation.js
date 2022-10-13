const {User} = require('../models')

module.exports = {
    emailUnique: (req, res, next) => {
        let email = req.body.email

        User.findOne({
            where: {
                email
            }
        }).then((data, error) => {
            if (error) {
                return res.status(500).send({
                    msg: `Internal server error`
                })
            }

            if (data) {
                return res.status(400).send({
                    msg: `Email address already in use!`
                })
            }

            next()
        })
    },
    phoneUnique: (req, res, next) => {
        let phone = req.body.phone

        User.findOne({
            where: {
                phone
            }
        }).then((data, error) => {
            if (error) {
                return res.status(500).send({
                    msg: `Internal server error`
                })
            }

            if (data) {
                return res.status(400).send({
                    msg: `Phone address already in use!`
                })
            }

            next()
        })
    },
    usernameUnique: (req, res, next) => {
        let username = req.body.username

        User.findOne({
            where: {
                username
            }
        }).then((data, error) => {
            if (error) {
                return res.status(500).send({
                    msg: `Internal server error`
                })
            }

            if (data) {
                return res.status(400).send({
                    msg: `Username address already in use!`
                })
            }

            next()
        })
    },
}