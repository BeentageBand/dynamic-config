const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

/*eslit-disable no-unused-vars*/
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: error.message,
        statck: process.env.NODE_ENV === 'production' ? 'stack' : error.stack,
    });
}

module.exports = {
    notFound,
    errorHandler,
};