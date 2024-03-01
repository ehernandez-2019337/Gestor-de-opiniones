'use strict'

import { Router } from 'express'
import { 
    save, 
    test, 
    orderAZ,
    orderZA,
    orderorderAge,
    update,
    report
} from './company.controller.js'

const api = Router()

api.get('/test', test)
api.post('/save', save)
api.get('/orderAZ', orderAZ)
api.get('/orderZA', orderZA)
api.get('/orderAge', orderorderAge)
api.put('/update/:id', update)
api.get('/report',report)


export default api