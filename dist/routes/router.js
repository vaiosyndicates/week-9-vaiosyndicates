"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerExpense = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller/controller"));
const validator_1 = __importDefault(require("../util/validator"));
let routerExpense = express_1.default.Router();
exports.routerExpense = routerExpense;
routerExpense.get('/user/:id', controller_1.default.getUserbyId);
routerExpense.get('/transaction', controller_1.default.getExpense);
routerExpense.post('/transaction/add', validator_1.default, controller_1.default.addExpense);
routerExpense.put('/transaction/edit/:id', validator_1.default, controller_1.default.editExpense);
routerExpense.delete('/transaction/delete/:id', controller_1.default.deleteExpense);
