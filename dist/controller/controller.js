"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
let models = [];
const collectData = (id, type, name, details, jumlah) => ({
    id,
    type,
    name,
    details,
    jumlah
});
const expenseController = {
    getExpense: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            connection_1.connection.query({ sql: `SELECT * FROM tb_expenses;` }, function (error, results) {
                if (Array.isArray(results) && results.length === 0) {
                    res.status(505).send({
                        responCode: 505,
                        status: 'failed',
                        message: 'Network Error',
                        payloads: error
                    });
                }
                if (results) {
                    res.status(200).json({
                        responCode: 200,
                        status: 'success',
                        message: 'Berhasil ambil data!',
                        payloads: results
                    });
                }
                else {
                    res.status(404).json({
                        responCode: 404,
                        status: 'success',
                        message: 'Data not found',
                        payloads: results
                    });
                }
            });
        }
        catch (error) {
            res.status(505).send({
                responCode: 505,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    }),
    getUserbyId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let ids = req.params.id;
            connection_1.connection.query(`
        SELECT 
          u.id, 
          u.name, 
          u.address , 
        SUM(CASE WHEN e.type = 'Cash In' THEN e.jumlah ELSE 0 END) AS income,
        SUM(CASE WHEN e.type = 'Cash Out' THEN e.jumlah ELSE 0 END) AS expense
        FROM tb_users AS u 
        JOIN tb_expenses AS e 
        ON e.id_user = u.id
        WHERE e.id_user = ${ids}
        GROUP BY u.id`, function (error, results) {
                if (error) {
                    res.status(505).send({
                        responCode: 505,
                        status: 'failed',
                        message: 'Network Error',
                        payloads: error.message
                    });
                }
                if (Array.isArray(results) && results.length === 0) {
                    res.status(404).json({
                        responCode: 404,
                        status: 'success',
                        message: 'Data not found',
                        payloads: results
                    });
                }
                else {
                    let parsed = JSON.parse(JSON.stringify(results));
                    let balance = parseInt(parsed[0].income) - parseInt(parsed[0].expense);
                    parsed[0]["income"] = parseInt(parsed[0]["income"]);
                    parsed[0]["expense"] = parseInt(parsed[0]["expense"]);
                    parsed[0]["balance"] = balance;
                    res.status(200).json({
                        responCode: 200,
                        status: 'success',
                        message: 'Berhasil ambil data!',
                        payloads: parsed
                    });
                }
            });
        }
        catch (error) {
            res.status(505).send({
                responCode: 505,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    }),
    addExpense: (req, res) => {
        try {
            // console.log(req.body)
            // let id = "id" + Math.random().toString(16).slice(2)
            connection_1.connection.query(`INSERT INTO tb_expenses (id_user,type, name, details, jumlah) VALUES(?,?,?,?,?);`, [req.body.id_user, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)], function (error, results) {
                if (error)
                    throw error;
                res.status(200).json({
                    responCode: 200,
                    status: 'success',
                    message: 'Berhasil tambah data!'
                });
            });
        }
        catch (error) {
            res.status(505).json({
                responCode: 505,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
    editExpense: (req, res) => {
        let id = req.params.id;
        try {
            connection_1.connection.query(`SELECT * FROM tb_expenses  WHERE id = '${id}';`, function (error, results) {
                if (error)
                    throw error;
                if (Array.isArray(results) && results.length !== 0) {
                    try {
                        connection_1.connection.query(`UPDATE tb_expenses set id_user = ?, type = ?, name = ?, details = ?, jumlah = ? WHERE id = ${id};`, [req.body.id_user, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)], function (error, results) {
                            if (error)
                                throw error;
                            res.status(200).json({
                                responCode: 200,
                                status: 'success',
                                message: 'Berhasil edit data!',
                                payloads: {
                                    id: parseInt(id)
                                }
                            });
                        });
                    }
                    catch (error) {
                        res.status(505).json({
                            responCode: 505,
                            status: 'failed',
                            message: 'Network Error',
                            payloads: error.message
                        });
                    }
                }
                else {
                    res.status(404).json({
                        responCode: 404,
                        status: 'success',
                        message: 'Data not found',
                    });
                }
            });
        }
        catch (error) {
            res.status(505).json({
                responCode: 505,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
    deleteExpense: (req, res) => {
        let id = req.params.id;
        try {
            connection_1.connection.query(`SELECT * FROM tb_expenses  WHERE id = '${id}';`, function (error, results) {
                if (error)
                    throw error;
                if (Array.isArray(results) && results.length !== 0) {
                    try {
                        connection_1.connection.query(`DELETE FROM tb_expenses  WHERE id = '${id}';`, function (error, results) {
                            if (error)
                                throw error;
                            res.status(200).send({
                                responCode: 200,
                                status: 'success',
                                message: 'Delete Success',
                                payloads: {
                                    id: parseInt(id)
                                }
                            });
                        });
                    }
                    catch (error) {
                        res.status(505).json({
                            responCode: 505,
                            status: 'failed',
                            message: 'Network Error',
                            payloads: error.message
                        });
                    }
                }
                else {
                    res.status(404).json({
                        responCode: 404,
                        status: 'success',
                        message: 'Data not found',
                    });
                }
            });
        }
        catch (error) {
            res.status(505).json({
                responCode: 505,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
};
exports.default = expenseController;
