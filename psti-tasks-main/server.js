const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Manejador de ruta para la página de inicio
const handleHomeRequest = (req, res) => {
  res.send("¡Hola, mundo!");
};

// Ruta principal
app.get("/", handleHomeRequest);

// Iniciar el servidor
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
  });
};

startServer();
