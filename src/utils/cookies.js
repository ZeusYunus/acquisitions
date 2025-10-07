const getOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000, // 15 minutes
});

export const cookies = {
    set: (res, name, value, options = {}) => {
        // express response uses res.cookie
        res.cookie(name, value, { ...getOptions(), ...options });
    },
    clear: (res, name, options = {}) => {
        // express response uses res.clearCookie
        res.clearCookie(name, { ...getOptions(), ...options });
    },
    get: (req, name) => {
        return req?.cookies ? req.cookies[name] : undefined;
    },
};