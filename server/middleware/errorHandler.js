function errorHandler(err, req, res, _next) {
console.error(`[ERROR] ${err.message}`);
res.status(500).json({
error: 'Internal server error',
message: process.env.NODE_ENV === 'development' ? err.message : undefined
});
}
module.exports = errorHandler;
