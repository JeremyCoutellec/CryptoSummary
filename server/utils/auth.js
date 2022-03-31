const getTokenFromBearer = (req) => {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    return token;
}

module.exports = {
    getTokenFromBearer
};
