import express from 'express';
import Expenses from '../model/Expenses';
import { validationResult } from "express-validator";
import { connection } from '../connection';

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
      connection.query(`SELECT * FROM tb_expense;`, function (error, results) {
        if(error) throw error;
        if(results.length > 0) {
          res.status(200).send({ 
            responCode: 200,
            status: 'success', 
            message: 'Berhasil ambil data!',
            payloads: results 
        });
        } else {
          res.status(404).send({ 
            responCode: 404,
            status: 'success', 
            message: 'Data not found',
            payloads: results 
        });
        }

      });
    } catch (error:any) {
      res.status(505).send({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message 
      });
    }
  },
  getExpensebyId: async (req: express.Request, res: express.Response) => {
    try {
      let ids = req.params.id
      connection.query(`
        SELECT 
          u.id, 
          u.name, 
          u.address , 
        SUM(CASE WHEN e.type = 'Cash In' THEN e.jumlah ELSE 0 END) AS income,
        SUM(CASE WHEN e.type = 'Cash Out' THEN e.jumlah ELSE 0 END) AS expense
        FROM tb_users AS u 
        JOIN tb_expense AS e 
        ON e.id_user = u.id
        WHERE e.id_user = ${ids}
        GROUP BY u.id`, function (error, results) {
          
        if(error) throw error;
        if(results.length > 0) {
          let parsed = JSON.parse(JSON.stringify(results))
          let balance = parsed[0].income - parsed[0].expense
          parsed[0]["balance"] = balance

          res.status(200).send({ 
            responCode: 200,
            status: 'success', 
            message: 'Berhasil ambil data!',
            payloads: parsed 
        });
        } else {
          res.status(404).send({ 
            responCode: 404,
            status: 'success', 
            message: 'Data not found',
            payloads: results 
         });
        }
      });

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
      // console.log(req.body)
      let id = "id" + Math.random().toString(16).slice(2)
      connection.query(`INSERT INTO tb_expense (id,id_user,type, name, details, jumlah) VALUES(?,?,?,?,?,?);`, [id, req.body.id_user, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)], 
      function (error, results) {
        if(error) throw error;  
        res.status(200).send({ 
            responCode: 200,
            status: 'success',
            message: 'Berhasil tambah data!',
            payloads: results 
        });
      });
    
    } catch (error:any) {
      res.status(505).send({ 
        responCode: 505,
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
  updateExpense: (req: express.Request, res: express.Response) => {

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