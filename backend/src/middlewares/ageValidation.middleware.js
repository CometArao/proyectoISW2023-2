"use strict";
/**
 * Verifica si el usuario es mayor de edad basándose en la fecha de nacimiento proporcionada.
 * @param {Object} req - Objeto de petición que incluye la fecha de nacimiento del usuario.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para continuar con la siguiente función en la cadena.
 */
const ageValidation = (req, res, next) => {
    const currentDate = new Date();
    const birthDate = new Date(req.body.Fecha_de_nacimiento); // SE DEBE CAMBIAR

    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();


    /* Si el mes actual es anterior al mes de nacimiento o si estamos 
    en el mismo mes pero el día actual es anterior al día de nacimiento, 
    restamos un año a la edad. */

   if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) {
    return res.status(400).json({
      message: "El postulante debe ser mayor de edad",
    });
  }

  next();
};

module.exports = ageValidation;
