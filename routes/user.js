const express = require('express');
const user = express.Router();
const DB = require('../config/database');
const jwt = require('jsonwebtoken');

user.post('/login', (req, res, next) => {
    const {user_name, user_password} = req.body;
    
    if (user_name && user_password ) {
        var query = "select user_key from users where user_name = ? and user_password = ?";
        var params = [user_name, user_password];

        DB.all(query, params, (err, consult) => {
            if (consult.length == 1) {
                return res.status(200).json({ code: 200, message: consult[0].user_key});
            }
            else{
                return res.status(400).json({ code: 400, message: "Usuario y/o contraseña incorrecta"});   
            }                     
        });        
    }
    else{
        return res.status(500).json({ code: 500, message: "Capos incompletos"});
    }    
})

user.post('/getToken', (req, res, next) => {
    const {user_key} = req.body;
    
    if (user_key) {   
        const token = jwt.sign({
            user_key: user_key
        }, "debugkey", { expiresIn: '5s' });
        return res.status(200).json({ code: 200, message: token});                    
    }
    else{
        return res.status(500).json({ code: 500, message: "Capos incompletos"});
    }    
})

module.exports = user;