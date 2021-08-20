const moment = require('moment');
const db = require("./db/db.js");

module.exports = {
  products: {
    getProducts: (req, res) => {
      db.pool.query("SELECT * FROM product order by index asc limit(10)", (err, data) => {
        res.status(200).send(data.rows);
      });
    },
    getProductInfo: (req, res) => {
      db.pool.query(`SELECT * FROM product WHERE index = ${req.params.id}`, (err, data) => {
        res.status(200).send(data.rows);
      });
    },
  },
  qa: {
    getQuestions: (req, res) => {
      db.pool.query(`SELECT id, product_id, body, TO_CHAR(TO_TIMESTAMP(date_written / 1000), 'YYYY-MM-DDThh:mm:ss.SSSZ') AS date_written, asker_name, reported, helpful FROM questions WHERE product_id = ${req.params.id} AND reported != 1`, (err, data) => {
        res.status(200).send(data.rows);
      });
    },
    getAnswers: (req, res) => {
      db.pool.query(`SELECT id, question_id, body, TO_CHAR(TO_TIMESTAMP(date_written / 1000), 'YYYY-MM-DDThh:mm:ss.SSSZ') AS date_written, answerer_name, reported, helpful FROM answers WHERE question_id = ${req.params.id} AND reported != 1`, (err, data) => {
        res.status(200).send(data.rows);
      });
    },
    updateQuestionHelpfulness: (req, res) => {
      db.pool.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${req.params.id} RETURNING helpful`, (err, data) => {
        res.status(200).send(data.rows);
      })
    },
    updateAnswerHelpfulness: (req, res) => {
      db.pool.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${req.params.id} RETURNING helpful`, (err, data) => {
        res.status(200).send(data.rows);
      })
    },
    postQuestions: (req, res) => {
      // const text = 'INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
      // const values = [req.body.product_id, req.body.body, 1616066721011, req.body.name, req.body.email, 0, 0]
      // db.pool.query(text, values, (err, data) => {
      //   if (err) {
      //     console.error(err);
      //   }
      //   else {
      //     res.status(201).send();
      //   }
      // })
      let date = moment().valueOf()
      const text = 'INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
      const values = [req.body.product_id, req.body.body, date, req.body.name, req.body.email, 0, 0]
      db.pool.query(text, values, (err, data) => {
        if (err) {
          console.error(err);
        }
        else {
          res.status(201).send();
        }
      })
    },
    postAnswers: (req, res) => {
      db.client.connect()
      db.client
        .query("begin")
        .then(data => {
          let date = moment().valueOf()
          const text = 'INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
          const values = [req.params.id, req.body.body, date, req.body.name, req.body.email, 0, 0]
          return db.client.query(text, values)
        })
        .then(data => {
          const text1 = 'INSERT INTO answers_photos (answer_id, url) VALUES ($1, $2)'
          const values1 = [data.rows[0].id, req.body.photos]
          return db.client.query(text1, values1)
        })
        .then(data => {
          return db.client.query("commit")
        })
        .then(data => {
          console.log('Transaction Complete!')
          res.status(201).send();
        })
        .catch(err => {
          console.error("Error while querying: ", err)
          return db.client.query("rollback")
        })
        .catch(err => console.error("Error while rolling back transaction:", err))
    },
    reportAnswer: (req, res) => {
      db.pool.query(`UPDATE answers SET reported = 1 WHERE id = ${req.params.id}`, (err, data) => {
        res.status(204).send();
      })
    },
  },
};
