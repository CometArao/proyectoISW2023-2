// Importa información de comunas y regiones de Chile para ser almacenado en la Base de Datos como datos de referencia
const fs = require('fs');
const mongoose = require('mongoose');

const data = require('./data/comunas-regiones.json');

const { Region, Commune } = require('./models/location.model.js');

// Conexion a la base de datos
mongoose.connect('mongodb+srv://franciscobarraza2001:go1ALvPVgcM0Uw5k@tarjetavecino.p0dqavf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectarse a MongoDB', err));

// Funcion para importar datos a la base de datos
async function importData() {
    for(const regionData of data.regiones){
        // Crea una nueva region
        const region = new Region({ name: regionData.region});
        
        // Guarda la region en la base de datos
        await region.save();

        for(const communeName of regionData.comunas){
            // Crea una nueva comuna
            const commune = new Commune({ 
                name: communeName, 
                region: region._id 
            });

            // Guarda la comuna en la base de datos
            await commune.save();
            console.log(`Comuna ${commune.name} importada con éxito`);
        }
        console.log(`Región ${region.name} importada con éxito`);
    }
    console.log('Datos importados con éxito');
}

// Conexion a la base de datos
mongoose.connect('mongodb+srv://franciscobarraza2001:go1ALvPVgcM0Uw5k@tarjetavecino.p0dqavf.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB exitosa.');
    importData()
      .then(() => mongoose.connection.close())
      .catch((err) => {
        console.error('Error al cargar los datos:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });