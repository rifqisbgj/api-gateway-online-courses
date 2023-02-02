const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USERS,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USERS);

module.exports = async (req, res) => {
    try {
        const user = await api.post(`/users/login`, req.body);
        const dataUser = user.data.data;

        const accessToken = jwt.sign({data: dataUser}, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
        const refreshToken = jwt.sign({ data: dataUser}, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED});

        await api.post('/refresh_tokens', { refresh_token: refreshToken, user_id: dataUser.id });

        return res.json({
            status: 'success',
            data: {
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({status: 'error', message: 'service unavailable'});
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}