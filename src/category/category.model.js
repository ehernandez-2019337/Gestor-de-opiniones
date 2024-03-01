import { Schema, model } from 'mongoose';

const categorySchema = Schema({
    category: {
        type: String,
        uppercase: true,
        enum: ['TECNOLOGIA', 'FINANZAS','SALUD','MANUFACTURA','SERVICIOS'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    versionKey: false //Desahabilitar el __v (version del documento)
})

export default model('category', categorySchema)