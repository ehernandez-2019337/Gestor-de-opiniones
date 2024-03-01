import { Schema, model } from 'mongoose';

const companySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    impact: {
        type: String,
        uppercase: true,
        enum: ['ALTO', 'MEDIO','BAJO'],
        required: true      
    }
}, {
    versionKey: false //Desahabilitar el __v (version del documento)
})

export default model('company', companySchema)