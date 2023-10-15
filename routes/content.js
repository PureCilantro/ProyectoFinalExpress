const express = require('express');
const content = express.Router();
const DB = require('../config/database');

content.get('/', (req, res, next) => {
    /* var query = "select * from employees";
    var params = [];

    DB.all(query, params, (err, consult) => {
        return res.status(200).json({ code: 200, message: consult});
    }); */ 
    const consult = DB.prepare('select * from employees');
    const result = consult.all();

    return res.status(200).json({ code: 200, message: result});
});

content.get('/:name([A-Za-z]+)', (req, res, next) => {
    /* var nameToSearch = "%" + req.params.name + "%";
    var query = "select * from employees where emp_name like ?";
    var params = [nameToSearch];

    DB.all(query, params, (err, consult) => {
        if (consult.length == 1) {
            return res.status(200).json({ code: 200, message: consult});
        }
        else{
            return res.status(204).json({ code: 204, message: "No se encontraron registros"});   
        }                     
    });  */
    var nameToSearch = "%" + req.params.name + "%";
    const consult = DB.prepare('select * from employees where emp_name like ?');
    const result = consult.all(nameToSearch);

    return res.status(200).json({ code: 200, result: result});
})

content.post('/', (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address} = req.body;
    
    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address) {
        /* var query = "insert into employees (emp_name, emp_lastname, emp_phone, emp_mail, emp_address) values (?,?,?,?,?)";
        var params = [emp_name, emp_lastname, emp_phone, emp_mail, emp_address];

        DB.run(query, params, (err) => {
            if (!err) {
                return res.status(201).json({ code: 201, message: "El registro ha sido creado con ID: " + this.lastID});
            }
            else{
                return res.status(400).json({ code: 400, message: "No se pudo crear el registro: " + err});   
            }                     
        }); */
        try {
            const consult = DB.prepare('insert into employees (emp_name, emp_lastname, emp_phone, emp_mail, emp_address) values (?,?,?,?,?)');
            const result = consult.run(emp_name, emp_lastname, emp_phone, emp_mail, emp_address);

            return res.status(200).json({ code: 200, message: "El registro ha sido creado con ID: " + result.lastInsertRowid});
        } catch (error) {
            return res.status(400).json({ code: 400, message: "No se pudo crear el registro: " + error.message});
        }
    } else {
        return res.status(500).json({ code: 500, message: "Campos incompletos"});    
    }     
})

content.put('/', (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address, emp_id} = req.body;
    
    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address && emp_id) {
        /* var query = "update employees set emp_name = ?, emp_lastname = ?, emp_phone = ?, emp_mail = ?, emp_address = ? where emp_id = ?";
        var params = [emp_name, emp_lastname, emp_phone, emp_mail, emp_address, emp_id];

        DB.run(query, params, (err) => {
            if (!err) {
                if (this.changes > 0) {
                    return res.status(200).json({ code: 200, message: "El registro ha sido actualizado"});
                }
                else{
                    return res.status(200).json({ code: 200, message: "No se actualizo ningun registro"});
                }                
            }
            else{
                return res.status(400).json({ code: 400, message: "No se pudo actualizar el registro: " + err});   
            }                     
        }); */
        try {
            const consult = DB.prepare('update employees set emp_name = ?, emp_lastname = ?, emp_phone = ?, emp_mail = ?, emp_address = ? where emp_id = ?');
            const result = consult.run(emp_name, emp_lastname, emp_phone, emp_mail, emp_address, emp_id);

            if (result.changes > 0) {
                return res.status(200).json({ code: 200, message: "El registro ha sido actualizado"});
            } else {
                return res.status(200).json({ code: 200, message: "No se actualizo ningun registro"});
            }
        } catch (error) {
            return res.status(400).json({ code: 400, message: "No se pudo actualizar el registro: " + error.message});
        }
    } else {
        return res.status(500).json({ code: 500, message: "Campos incompletos"});    
    }     
})

module.exports = content;