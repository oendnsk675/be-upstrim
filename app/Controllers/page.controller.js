const { page: Page, User } = require('../models')


const getMyPage = (req, res) => {
    
    try {
        Page.findOne({
            where: {
                "user_id": req.userId
            }
        }).then(data => {
            
            res.status(200).json({
                msg: "Success retrieve page data",
                data
            })
        })
        return
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
    
    
}

const createOrUpdatePage = (req, res) => {

    try {
        Page.findOne({
            where: {
                "user_id": req.userId
            }
        }).then(obj => {

            if (obj) {
                obj.update(req.body).then(data => {
                    res.status(200).json({
                        msg: "Success update page data",
                        data
                    })
                })
                return 
            }

            req.body["user_id"] = req.userId

            Page.create(req.body).then(data => {
                res.status(200).json({
                    msg: "Success create page data",
                    data
                })
            })
            return
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
    
}

const getPage = (req, res) => {
    try {
        
        User.findOne({
            where: {username: req.params.username},
            attributes: ['id']
        }).then(user => {
            Page.findOne({
                where: {
                    "user_id": user.id
                }
            }).then(data => {
                
                res.status(200).json({
                    msg: "Success retrieve page data",
                    data
                })
            })
        }).catch(error => {
            res.status(500).json({
                "msg": "Internal server error"
            })
        })
        
        
        return
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = {
    getMyPage,
    createOrUpdatePage,
    getPage,
}