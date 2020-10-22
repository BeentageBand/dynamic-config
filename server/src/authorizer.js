const basicAuth = require('express-basic-auth');

function getUnauthorizedResponse(req, res) {
    const errorMsg = req.auth
        ? `Credentials ${req.auth.user}:${req.auth.password} rejected.`
        : `No credentials provided`;
    console.log(errorMsg)
    res.json({
        message: errorMsg
    });
}

const authorizer = new basicAuth({
    users: {
        'admin' : 'simplepass',
    },
    authorizeResponse: getUnauthorizedResponse
})


module.exports = authorizer; 