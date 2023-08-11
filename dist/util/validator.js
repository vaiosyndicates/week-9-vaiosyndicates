"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const expenseValidator = [
    (0, express_validator_1.body)("type")
        .exists({ checkFalsy: true })
        .withMessage("Type is required"),
    (0, express_validator_1.body)("name")
        .exists({ checkFalsy: true })
        .withMessage("Name is required"),
    (0, express_validator_1.body)("details")
        .exists({ checkFalsy: true })
        .withMessage("Details is required"),
    (0, express_validator_1.body)("jumlah")
        .exists({ checkFalsy: true })
        .withMessage("Jumlah is required"),
];
exports.default = expenseValidator;
