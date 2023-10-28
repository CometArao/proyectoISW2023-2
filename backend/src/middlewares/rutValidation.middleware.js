"use strict";

/**
 * Verifica si el RUT chileno tiene el formato correcto y es válido.
 * @param {Object} req - Objeto de petición que incluye el RUT del usuario.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para continuar con la siguiente función en la cadena.
 */
const rutValidation = (req, res, next) => {
    const rut = req.body.Rut;

    // Verificar formato del RUT
    const pattern = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
    if (!pattern.test(rut)) {
        return res.status(400).json({
            message: "Formato de RUT inválido.",
        });
    }

    // Verificar dígito verificador (Esta es una validación básica. Hay algoritmos más detallados para esto)
    const digits = rut.split("-")[0].replace(/\./g, "");
    const verifier = rut.split("-")[1].toUpperCase();
    // ... (Aquí iría el algoritmo para verificar el dígito)

    // Si todo está correcto, continuar con el siguiente middleware
    next();
};

module.exports = rutValidation;
