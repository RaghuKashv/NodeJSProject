import database from '../config/mysql.config.js';
import Response from '../domain/response.js';
import logger from '../util/logger.js';
import QUERY from '../query/raghu.query.js';

const httpStatus = {
    OK: {code:200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    OK: {code: 204, status: 'OK'},
    BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'}
};

export const getRaghus = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching raghus`);
    database.query(QUERY.SELECT_RAGHUS, (error, results) => {
        if(!results) {
           res.status(HttpStatus.OK.code)
           .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `No raghu found`));
        } else {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.ok.code, HttpStatus.OK.status, `Raghus retrieved`,{ raghus: results })); 
        }
    });
};

export const createdRaghu = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, creating raghu`);
    database.query(QUERY.CREATE_RAGHU, Object.values(req.body),(error, results) => {
        if(!results) {
           logger.error(error.message)
           res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
             .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
        } else {
            const raghu = {id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HttpStatus.CREATED.code)
            .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Raghus created`,{ raghu })); 
        }
    });
};


export const getRaghu = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching raghus`);
    database.query(QUERY.SELECT_RAGHU, [req.params.id],(error, results) => {
        if(!results[0]) {
           res.status(HttpStatus.NOT_FOUND.code)
             .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Raghu by od ${req.params.id} was not found`));
        } else {
            res.status(HttpStatus.OK.code)
            .send(new Response(HttpStatus.Ok.code, HttpStatus.OK.status, `Raghus retrieved`, results[0] )); 
        }
    });
};

export const updateRaghu = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, fetching raghus`);
    database.query(QUERY.SELECT_RAGHU, [req.params.id],(error, results) => {
        if(!results[0]) {
           res.status(HttpStatus.NOT_FOUND.code)
             .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Raghu by id ${req.params.id} was not found`));
        } else {
            logger.info(`${req.method} ${req.originalurl}, updating raghus`);
            database.query(QUERY.UPDATE_RAGHU, [...Object.values(req.body), req.params.id],(error, results) => {
                if(!error){
                    res.status(HttpStatus.OK.code)
                     .send(new Response(HttpStatus.Ok.code, HttpStatus.OK.status, `Raghu updated`, { id: req.params.id, ...req.body}));
                } else{
                    logger.error(error.message);
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
                    .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code, HttpStatus.INTERNAL_SERVER_ERROR.status, `Error occurred`));
                }
            });
        }
    });
};

export const deleteRaghu = (req, res) => {
    logger.info(`${req.method} ${req.originalurl}, deleting raghus`);
    database.query(QUERY.DELETE_RAGHU, [req.params.id],(error, results) => {
        if(results.affectedRows > 0 ) {
           res.status(HttpStatus.OK.code)
             .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Raghu deleted`,  results[0]));
        } else {
            res.status(HttpStatus.NOT_FOUND.code)
            .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Raghu by id ${req.params.id} was not found`));
        }
    });
};

export default httpStatus;
 