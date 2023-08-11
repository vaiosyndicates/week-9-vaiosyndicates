import { body } from "express-validator";

const expenseValidator = [
  body("type")
    .exists({ checkFalsy: true })
    .withMessage("Type is required"),
 body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required"),
 body("details")
    .exists({ checkFalsy: true })
    .withMessage("Details is required"),
 body("jumlah")
    .exists({ checkFalsy: true })
    .withMessage("Jumlah is required"),
];

export default expenseValidator