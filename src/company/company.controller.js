'use strict'

import Company from './company.model.js '
import Category from '../category/category.model.js'
import { checkUpdate } from '../utils/validator.js'
import ExcelJS from 'exceljs'

export const test = (req, res) => {
    console.log('Test is running')
    res.send({ message: 'test company is running' })
}

export const save = async(req,res)=>{
    try{
        //capturar la data
        let data = req.body
        //validar que la categoria exista

        
        let category = await Category.findOne({ _id: data.category })

        if(!category) return res.send({message: 'category not found or not exist'})
        //crear instancia company
        let company = new Company(data)
        await company.save()

        //responder al usuario
        return res.send({message: 'company saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message:'error saving company'})
    }
}




export const orderAZ = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companies' })
    }
}

export const orderZA = async (req, res) => {
    try {
        let companies = await Company.find().sort({name: -1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companiesD' })
    }
}

export const orderorderAge = async (req, res) => {
    try {
        let companies = await Company.find().sort({age: 1})
        return res.send({ companies })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error ordening companies' })
    }
}


export const update = async (req, res) => {
    try {
        //Capturar la data
        let data = req.body
        //Capturar el id del animal a actualizar
        let { id } = req.params
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar
    let updateCompany = await Company.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
        ).populate('category', ['category']) //Eliminar la información sensible
        //Validar la actualización
        if(!updateCompany) return res.status(404).send({message: 'company not found and not updated'})
        //Responder si todo sale bien
        return res.send({message: 'company updated successfully', updateCompany})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating company' })
    }
}

export const report = async (req, res) => {
    try {
        // Obtener todas las empresas registradas
        const companies = await Company.find();

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies');

        // Definir encabezados de columna
        worksheet.addRow(['Name', 'Level of Immpact', 'Years', 'Category']);

        // Agregar datos de empresas al archivo Excel
        companies.forEach(company => {
            worksheet.addRow([
                company.name,
                company.impact,
                company.age,
                company.category
            ]);
        });

        // Escribir el archivo Excel en un buffer
        let excel = await workbook.xlsx.writeBuffer();

        // Establecer encabezados de respuesta para indicar que se está enviando un archivo Excel
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=empresas.xlsx');

        // Enviar el buffer del archivo Excel como respuesta
        res.send(excel);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'error generating excel report' });
    }
};