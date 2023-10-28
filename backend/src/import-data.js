// Importa información de comunas y regiones de Chile para ser almacenado en la Base de Datos como datos de referencia
const fs = require('fs');
const mongoose = require('mongoose');
const { Region, Commune } = require('./models/location.model.js');

// Conexion a la base de datos
mongoose.connect('mongodb+srv://franciscobarraza2001:go1ALvPVgcM0Uw5k@tarjetavecino.p0dqavf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectarse a MongoDB', err));

// Importa comunas y regiones desde el archivo comunas-regiones.json
// archivo extraido de: https://gist.github.com/juanbrujo/0fd2f4d126b3ce5a95a7dd1f28b3d8dd
fs.readFile('./data/comunas-regiones.json', 'utf8', async (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON', err);
        return;
    }
    try {
        const RegAndCom = JSON.parse(data);
        for (const regionData of RegAndCom.regiones) {
            const region = new Region({ name: regionData.region });
            await region.save();

            for (const communeData of regionData.comunas) {
                const commune = new Commune({ name: communeData });
                await commune.save();
                region.communes.push(commune);
            }

            await region.save();
        }
        console.log('Regiones y comunas importadas con éxito');
    } catch (error) {
        console.error('Error al importar regiones y comunas', error);
    }
});