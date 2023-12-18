
/**
 * Validates the request body for tarjetaSchema.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function validarSolicitudTarjeta(req, res, next) {
        const { error } = tarjetaSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        next();
}
module.exports = validarSolicitudTarjeta;
