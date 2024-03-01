
import express from 'express'

import {
    test,
    register,
    login
} from './user.controller.js';

import { 
    validateJwt,
    isAdmin
} from '../middlewres/validate-jwt.js';

const api = express.Router();

//RUTAS PÚBLICAS
api.post('/register', register)
api.post('/login', login)

//RUTAS PRIVADAS (solo usuarios logeados)
                  //Middleware
api.get('/test', [validateJwt, isAdmin], test)



export default api