const { page: Page, User } = require('../models')


const getMyPage = (req, res) => {
    
    try {
        Page.findAll({
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

const createPage = (req, res) => {
    try {
        req.body["user_id"] = req.userId

        Page.create(req.body).then(data => {
            return res.status(200).json({
                msg: "Success create page data",
                data
            })
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updatePage = (req, res) => {

    try {
        Page.findOne({
            where: {
                "id": req.body.id_page,
                "user_id": req.userId,
            }
        }).then(obj => {

            if (obj) {
                obj.update(req.body).then(data => {
                    return res.status(200).json({
                        msg: "Success update page data",
                        data
                    })
                })
            }else{
                res.status(401).json({
                    msg: "Unauthorized"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
    
}

const getPage = (req, res) => {
    try {

        Page.findOne({
            where: {
                "id": req.params.id_page
            }
        }).then(data => {
            return res.status(200).json({
                msg: "Success retrieve page data",
                data
            })
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const deletePage = (req, res) => {
    try {
        Page.destroy({
            where: {
                "id": req.params.id_page,
                "user_id": req.userId,
            }
        }).then(data => {
            if(data) {
                return res.status(200).json({
                    msg: "Success delete page"
                })
            }else{
                res.status(401).json({
                    msg: "Unauthorized"
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

module.exports = {
    getMyPage,
    createPage,
    updatePage,
    getPage,
    deletePage,
}