const path = require("path");

// Importa el archivo 'configEnv.js' para cargar las variables de entorno
const { PORT, HOST } = require("./config/configEnv.js");
// Importa el módulo 'cors' para agregar los cors
const cors = require("cors");
// Importa el módulo 'express' para crear la aplicacion web
const express = require("express");
// Importa el módulo 'multer' para subir archivos
const multer = require("multer");
// Importamos morgan para ver las peticiones que se hacen al servidor
const morgan = require("morgan");
// Importa el módulo 'cookie-parser' para manejar las cookies
const cookieParser = require("cookie-parser");
/** El enrutador principal */
const indexRoutes = require("./routes/index.routes.js");
// Importa el archivo 'configDB.js' para crear la conexión a la base de datos
const { setupDB } = require("./config/configDB.js");
// Importa el handler de errores
const { handleFatalError, handleError } = require("./utils/errorHandler.js");
const { createRoles, createUsers } = require("./config/initialSetup");
// Importa enrutador de convenios
const agreementRoutes = require("./routes/agreement.routes.js");
// Importa enrutador de autenticación
const authRoutes = require("./routes/auth.routes.js");

/**
 * Inicia el servidor web
 */
async function setupServer() {
  try {
    /** Instancia de la aplicacion */
    const server = express();
    // Agrega el middleware para el manejo de datos en formato JSON
    server.use(express.json());
    // Agregamos los cors

    // server.use(cors({ origin: "*" }));

    // CONFIGURAR ESTE ARCHIVO AL MOMENTO DE SUBIR AL SERVIDOR
    // server.use(cors());
    server.use(cors({ origin: true, credentials: true }));
    // server.use(cors({ origin: "http://localhost:5173" }));
    // server.use(cors({ origin: "/" }));

    // Agregamos el middleware para el manejo de cookies
    server.use(cookieParser());
    // Agregamos morgan para ver las peticiones que se hacen al servidor
    server.use(morgan("dev"));

    // Configuración de rutas estáticas para las imágenes
    server.use("/api/images", express.static(path.join(__dirname, "./data/images")));
    // server.use("api/images", express.static(path.join(__dirname, "./data/images")));
    // console.log("dirname: ", __dirname);
    
    // Agrega el middleware para el manejo de datos en formato URL
    server.use(express.urlencoded({ extended: true }));
    // Agrega el enrutador principal al servidor
    server.use("/api", indexRoutes);
    // Agrega el enrutador de convenios al servidor
    server.use("/api/convenios", agreementRoutes);
    // Agrega el enrutador de autenticación al servidor
    server.use("/api/", authRoutes);

    // Agrega el middleware para el manejo de errores de multer
    server.use((err, req, res, next) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send({ message: "Error al subir el archivo." });
      } else if (err) {
        res.status(500).send({ message: err.message });
      }
    });

    
    // Inicia el servidor en el puerto especificado
    server.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`=> Servidor corriendo en ${HOST}:${PORT}/api`);
    });
  } catch (err) {
    handleError(err, "/server.js -> setupServer");
  }
}

/**
 * Inicia la API
 */
async function setupAPI() {
  try {
    // Inicia la conexión a la base de datos
    await setupDB();
    // Inicia el servidor web
    await setupServer();
    // Inicia la creación de los roles
    await createRoles();
    // Inicia la creación del usuario admin y user
    await createUsers();
  } catch (err) {
    handleFatalError(err, "/server.js -> setupAPI");
  }
}

// Inicia la API
setupAPI()
  // eslint-disable-next-line no-console
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((err) => handleFatalError(err, "/server.js -> setupAPI"));
