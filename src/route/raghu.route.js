import express from 'express';
import {getRaghus, createRaghu, getRaghu, deleteRaghu, updateRaghu } from ' ../controller/raghu.controller.js';

const raghuRoutes = express.Router();

raghuRoutes.route('/')
    .get(getRaghus)
    .post(createRaghu);

raghuRoutes.route('/:id')
    .get(getRaghu)  
    .put(updateRaghu)
    .delete(deleteRaghu);

    export default raghuRoutes;