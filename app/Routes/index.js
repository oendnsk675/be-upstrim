module.exports = (express, app, default_router) => {
    require('./user.route')(express, app, default_router)
    require('./xendit.route')(express, app, default_router)
    // require('./midtrans.route')(express, app, default_router)
    require('./finance.route')(express, app, default_router)
    require('./page.route')(express, app, default_router)
    require('./wallet.route')(express, app, default_router)
}