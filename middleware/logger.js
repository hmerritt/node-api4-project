module.exports = () => {
    //  Log each request
    return (req, res, next) => {
        console.log(
            `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.url}`
        );

        next();
    };
};
