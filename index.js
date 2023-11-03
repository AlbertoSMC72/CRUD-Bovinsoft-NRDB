    require('dotenv').config();

    require('./src/configs/db.config');

    const express = require('express');
    const app = express();
    const usuariosRouter = require('./src/routes/usuarios.route');
    const authRouter = require('./src/routes/auth.route');
    const bovinosRouter = require('./src/routes/bovinos.route');
    const estadosRouter = require('./src/routes/estados.route');
    const eventosRouter = require('./src/routes/eventos.route');

    app.use(express.json());
    app.use('/usuarios', usuariosRouter);
    app.use('/auth', authRouter);
    app.use("/bovinos", bovinosRouter);
    app.use("/estados", estadosRouter)
    app.use("/eventos", eventosRouter)


    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log("API escuchando en el puerto " + PORT);
    });