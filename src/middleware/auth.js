import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decoded.userId

            next()
        } catch (error) {
            return res.json({
                message: 'err',
            })
        }
    } else {
        return res.json({
            message: 'token avoid',
        })
    }
}
