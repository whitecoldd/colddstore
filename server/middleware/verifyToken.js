const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET_JWT, (e, user) => {
            if (e) res.status(403).json('Token is not valid')
            req.user = user
            next()
        })
    } else {
        return res.status(401).json('Authenticate first')
    }
}

const verifyTokenAndAuthor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You have no rights to do that')
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json('You have no rights to do that')
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthor, verifyTokenAndAdmin };