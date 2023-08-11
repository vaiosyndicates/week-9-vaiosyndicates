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
routerExpense.get('/expense', controller_1.default.getExpense);
routerExpense.post('/expense/add', validator_1.default, controller_1.default.addExpense);
routerExpense.put('/expense/edit/:id', validator_1.default, controller_1.default.editExpense);
routerExpense.delete('/expense/delete/:id', controller_1.default.deleteExpense);
