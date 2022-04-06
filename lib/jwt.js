import jwt from 'jsonwebtoken'
import Token from './models/Token'

function generateAccessToken(user) {
    const { id, username, role } = user
    return jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    })
}

async function generateRefreshToken(user) {
    const { id, username, role } = user
    const refreshToken = jwt.sign({ id, username, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
    // save refresh token to database
    const token = new Token({ token: refreshToken })
    await token.save()

    return refreshToken
}

export { generateAccessToken, generateRefreshToken }