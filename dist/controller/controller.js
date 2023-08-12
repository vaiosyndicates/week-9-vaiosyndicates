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
const express_validator_1 = require("express-validator");
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
            if (models.length <= 0) {
                res.status(200).send({
                    responCode: 200,
                    status: 'success',
                    message: 'Data empty',
                    payloads: models
                });
            }
            else {
                res.status(200).send({
                    responCode: 200,
                    status: 'success',
                    message: 'Success get data',
                    payloads: models
                });
            }
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
    getExpensebyId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let ids = req.params.id;
            let objIndex = models.findIndex((obj => obj.id == `${ids}`));
            if (objIndex !== -1) {
                res.status(200).send({
                    responCode: 200,
                    status: 'success',
                    payloads: models[objIndex]
                });
            }
            else {
                res.status(404).send({
                    responCode: 404,
                    status: 'success',
                    message: 'Data not Found'
                });
            }
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
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            else {
                let id = "id" + Math.random().toString(16).slice(2);
                models.push(collectData(id, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)));
                res.status(200).send({
                    responCode: 200,
                    status: 'success',
                    message: 'Berhasil tambah data!'
                });
            }
        }
        catch (error) {
            res.status(505).send({
                responCode: 500,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
    editExpense: (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            let ids = req.params.id;
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            else {
                let objIndex = models.findIndex((obj => obj.id == `${ids}`));
                if (objIndex !== -1) {
                    models[objIndex].type = req.body.type == '1' ? 'Cash In' : 'Cash Out';
                    models[objIndex].name = req.body.name;
                    models[objIndex].details = req.body.details;
                    models[objIndex].jumlah = parseInt(req.body.jumlah);
                    res.status(200).send({
                        responCode: 200,
                        status: 'success',
                        message: 'Update data success'
                    });
                }
                else {
                    res.status(200).send({
                        responCode: 200,
                        status: 'success',
                        message: 'Data not Found'
                    });
                }
            }
        }
        catch (error) {
            res.status(505).send({
                responCode: 500,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
    updateExpense: (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            let ids = req.params.id;
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array(),
                });
            }
            else {
                let objIndex = models.findIndex((obj => obj.id == `${ids}`));
                if (objIndex !== -1) {
                    models[objIndex].type = req.body.type == '1' ? 'Cash In' : 'Cash Out';
                    res.status(200).send({
                        responCode: 200,
                        status: 'success',
                        message: 'Update data success'
                    });
                }
                else {
                    res.status(200).send({
                        responCode: 200,
                        status: 'success',
                        message: 'Data not Found'
                    });
                }
            }
        }
        catch (error) {
            res.status(505).send({
                responCode: 500,
                status: 'failed',
                message: 'Network Error',
                payloads: error.message
            });
        }
    },
    deleteExpense: (req, res) => {
        try {
            let ids = req.params.id;
            let objIndex = models.findIndex((obj => obj.id == `${ids}`));
            if (objIndex !== -1) {
                models.splice(objIndex, 1);
                res.status(200).send({
                    responCode: 200,
                    status: 'success',
                    message: 'Success delete data',
                });
            }
            else {
                res.status(200).send({
                    responCode: 200,
                    status: 'failed',
                    message: 'Data not found',
                });
            }
        }
        catch (error) {
            res.status(505).send({
                responCode: 505,
                status: 'failed',
                message: 'Network Failed',
                error: error.message
            });
        }
    },
};
exports.default = expenseController;
