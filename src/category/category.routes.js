import express from 'express'
import { test, save, deleteCategory, get, update} from './category.controller.js';
import { isAdmin, validateJwt } from '../middlewres/validate-jwt.js';

const api = express.Router();

api.get('/test', test)
api.post('/save', save)
api.delete('/delete/:id',[validateJwt],[ isAdmin],deleteCategory)
api.get('/get', get)
api.put('/update/:id', update)

export default api