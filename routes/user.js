// Dependencies
const express = require('express');
const user = express.Router();
const DB = require('../config/database');
const jwt = require('jsonwebtoken');

// Checks for user_name & user_password in db, if found returns their user_key
user.post('/login', (req, res, next) => { 
    const {user_name, user_password} = req.body;
    
    if (user_name && user_password ) {
        const consult = DB.prepare('select user_key from users where user_name = ? and user_password = ?');
        const result = consult.all(user_name, user_password);

        if (result.length == 1) {
            return res.status(200).json({ code: 200, user_key: result[0].user_key});
        }
        else{
            return res.status(400).json({ code: 400, message: "Usuario y/o contraseña incorrecta"});   
        }
    }
    else{
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
    }    
})

// Checks if user_key is valid and returns a 5 second token to consume the API
user.post('/getToken', (req, res, next) => { 
    const {user_key} = req.body;

    if (user_key) {
        const consult = DB.prepare('select count(*) as count from users where user_key = ?');
        const result = consult.get(user_key);

        if (result.count > 0) {
            const token = jwt.sign({
                user_key: user_key
            }, "debugkey", { expiresIn: '5s' });
            return res.status(200).json({ code: 200, token: token});
        }
        else{
            return res.status(401).json({ code: 401, message: "No tienes permiso"});
        }
    }
    else{
        return res.status(500).json({ code: 500, message: "Campos incompletos"});
    }
})

module.exports = user;