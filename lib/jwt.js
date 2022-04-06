import jwt from 'jsonwebtoken'

function generateAccessToken(user) {
    const { id, username, role } = user
    return jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10s'
    })
}

function generateRefreshToken(user) {
    const { id, username, role } = user
    return jwt.sign({ id, username, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
}

export { generateAccessToken, generateRefreshToken }