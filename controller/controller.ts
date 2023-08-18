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
          res.status(200).json({ 
            responCode: 200,
            status: 'success', 
            message: 'Berhasil ambil data!',
            payloads: results 
        });
        } else {
          res.status(404).json({ 
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
          let balance = parseInt(parsed[0].income) - parseInt(parsed[0].expense)
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
      // let id = "id" + Math.random().toString(16).slice(2)
      connection.query(`INSERT INTO tb_expense (id_user,type, name, details, jumlah) VALUES(?,?,?,?,?);`, [req.body.id_user, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)], 
      function (error, results) {
        if(error) throw error;  
        console.log(results)
        res.status(200).json({ 
            responCode: 200,
            status: 'success',
            message: 'Berhasil tambah data!',
            payloads: {
              id: results.insertId
            } 
        });
      });
    
    } catch (error:any) {
      res.status(505).json({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message 
      });
    }
  },
   editExpense: (req: express.Request, res: express.Response) => {
    let id = req.params.id
    try {
      
      connection.query(`SELECT * FROM tb_expense  WHERE id = '${id}';`, function (error, results) {
        if(error) throw error;
        if(results.length > 0) {
          try {
        
            connection.query(`UPDATE tb_expense set id_user = ?, type = ?, name = ?, details = ?, jumlah = ? WHERE id = ${id};`, [req.body.id_user, req.body.type == '1' ? 'Cash In' : 'Cash Out', req.body.name, req.body.details, parseInt(req.body.jumlah)], 
            function (error, results) {
              if(error) throw error;  
              console.log(results)
              res.status(200).json({
                  responCode: 200,
                  status: 'success',
                  message: 'Berhasil edit data!',
                  payloads: {
                    id: parseInt(id)
                  }
              });
            });
          
          } catch (error:any) {
            res.status(505).json({ 
              responCode: 505,
              status: 'failed',
              message: 'Network Error',
              payloads: error.message 
            });
          }
        } else {
          res.status(404).json({ 
            responCode: 404,
            status: 'success', 
            message: 'Data not found',
          });
        }
  
      });
    
    } catch (error:any) {
      res.status(505).json({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message 
      });
    }
  },
  deleteExpense: (req: express.Request, res: express.Response) => {
    let id = req.params.id
    try {
      
      connection.query(`SELECT * FROM tb_expense  WHERE id = '${id}';`, function (error, results) {
        if(error) throw error;
        if(results.length > 0) {
          try {
        
            connection.query(`DELETE FROM tb_expense  WHERE id = '${id}';`, 
            function (error, results) {
              if(error) throw error;
              res.status(200).send({ 
                  responCode: 200,
                  status: 'success',
                  message: 'Delete Success',
                  payloads: {
                    id: parseInt(id)
                  } 
              });
            });
          
          } catch (error:any) {
            res.status(505).json({ 
              responCode: 505,
              status: 'failed',
              message: 'Network Error',
              payloads: error.message 
            });
          }
        } else {
          res.status(404).json({ 
            responCode: 404,
            status: 'success', 
            message: 'Data not found',
          });
        }
      });
    
    } catch (error:any) {
      res.status(505).json({ 
        responCode: 505,
        status: 'failed',
        message: 'Network Error',
        payloads: error.message 
      });
    }
  },
}

export default expenseController