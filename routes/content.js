const express = require('express');
const content = express.Router();
const DB = require('../config/database');

// Returns all employees from db
content.get('/', (req, res, next) => {
    const consult = DB.prepare('select * from employees');
    const result = consult.all();

    return res.status(200).json({ code: 200, message: result});
});

// Searches and returns all employees that match the input
content.get('/:name([A-Za-z]+)', (req, res, next) => {
    var nameToSearch = "%" + req.params.name + "%";
    const consult = DB.prepare('select * from employees where emp_name like ?');
    const result = consult.all(nameToSearch);

    return res.status(200).json({ code: 200, result: result});
})

// Creates a new row with the input information of the employee
content.post('/', (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address} = req.body;
    
    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address) {
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

// Updates an existing row with the input information of the employee, note that all info must be sent, changed or not
content.put('/', (req, res, next) => {
    const { emp_name, emp_lastname, emp_phone, emp_mail, emp_address, emp_id} = req.body;
    
    if (emp_name && emp_lastname && emp_phone && emp_mail && emp_address && emp_id) {
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

// Deletes an existing rown based on the employee id
content.delete('/', (req, res, next) => {
    const {emp_id} = req.body;
    
    if (emp_id) {
        try {
            const consult = DB.prepare('delete from employees where emp_id = ?');
            const result = consult.run(emp_id);

            if (result.changes > 0) {
                return res.status(200).json({ code: 200, message: "El registro ha sido borrado"});
            } else {
                return res.status(200).json({ code: 200, message: "No se borró ningun registro"});
            }
        } catch (error) {
            return res.status(400).json({ code: 400, message: "No se pudo actualizar el registro: " + error.message});
        }
    } else {
        return res.status(500).json({ code: 500, message: "Campos incompletos"});    
    }     
})

module.exports = content;