import express from 'express';
import Expenses from '../model/Expenses';
import { validationResult } from "express-validator";

let models:Array<any> = [];

const collectData = (id: string, type: string, name: string, details: string, jumlah: number): Expenses => ({
  id,
  type,
  name,
  details,
  jumlah
});


const expenseController = {

  getExpense: async (req: express.Request, res: express.Response) => {
    try {
      if (models.length <= 0) {
        res.status(200).send({ 
          responCode: 200,
          status: 'success',
          message: 'Data empty',
          payloads: models
        });
      } else {
        res.status(200).send({ 
          responCode: 200,
          status: 'success',
          message: 'Success get data',
          payloads: models
        });
      }

    } catch (error: any) {
      res.status(505).send({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message
      });
    }
  },
  addExpense: (req: express.Request, res: express.Response) => {

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      } else {

        let id = "id" + Math.random().toString(16).slice(2)
        models.push(collectData(id, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah) ))
        res.status(200).send({ 
              responCode: 200,
              status: 'success',
              message: 'Berhasil tambah data!'
        });

      }

    } catch (error: any) {
      res.status(505).send({ 
        responCode: 500,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message
      });
    }
  },
  editExpense: (req: express.Request, res: express.Response) => {

    try {
      const errors = validationResult(req);
      let ids = req.params.id

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      } else {

        let objIndex = models.findIndex((obj => obj.id == `${ids}`));
        if (objIndex !== -1) {
  
          models[objIndex].type =  req.body.type == '1' ? 'Cash In' : 'Cash Out'
          models[objIndex].name = req.body.name
          models[objIndex].details = req.body.details
          models[objIndex].jumlah = parseInt(req.body.jumlah)
  
          res.status(200).send({ 
            responCode: 200,
            status: 'success',
            message: 'Update data success'
          });
        } else {
            res.status(200).send({ 
            responCode: 200,
            status: 'success',
            message: 'Data not Found'
          });
        }
      }

    } catch (error: any) {
      res.status(505).send({ 
        responCode: 500,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message
      });
    }
  },
  deleteExpense: (req: express.Request, res: express.Response) => {
    try {
      let ids = req.params.id
      let objIndex = models.findIndex((obj => obj.id == `${ids}`));

      if (objIndex !== -1) {
        models.splice(objIndex, 1);
        res.status(200).send({ 
          responCode: 200,
          status: 'success',
          message: 'Success delete data',
        });
      } else {
          res.status(200).send({ 
          responCode: 200,
          status: 'failed',
          message: 'Data not found',
        });
      }
    } catch (error: any) {
      res.status(505).send({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Failed',
        error: error.message
      });
    }
  },
}

export default expenseController