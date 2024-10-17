const pool  = require('../../db/mongo');
const CryptoJS = require('crypto-js');
const moment = require('moment-timezone');


//---------------Login---------------------
const postLogin = async (req, res) => {
    const datos = req.body;
    //console.log("LOGIN: ", datos);
    const hashedPassword = CryptoJS.SHA256(datos.password, process.env.CODE_SECRET_DATA).toString();
    console.log("PASSS: ", hashedPassword);
    try{
      const users =  await pool.db('claseMartes').collection('usuarios').find().toArray()
      console.log("USERS: ", users);
      const login =  await pool.db('claseMartes').collection('usuarios').findOne({ email: datos.email, pass: hashedPassword });
      if (login) {
        // Obtener la fecha y hora actual en formato Bogotá
        const currentDateTime = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
        // Almacenar en la colección log_login
        await pool.db('claseMartes').collection('log_login').insertOne({ email: datos.email, role: login.role, date: currentDateTime });
        res.json({ status: "Bienvenido", user: datos.email, role: login.role});
      } else {
        res.json({ status: "ErrorCredenciales" });
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
  };
  

module.exports = { postLogin };