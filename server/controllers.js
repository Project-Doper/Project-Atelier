const axios = require("axios");
const config = require("./config/config.js");

const configuration = (endpoint, method, queryParams, bodyParams) => ({
  method: method,
  url: `http://localhost:3000/`,
  // headers: {
  //   Authorization: `${config.TOKEN}`,
  // },
  data: bodyParams,
  params: queryParams
});

module.exports = {
  products: {
    getProducts: (req, res) => {
      db.pool.query("SELECT * FROM product limit(4)", (err, data) => {
        console.log(data);
        res.status(200).send(data);
        db.pool.end();
      });
    },
    getProductInfo: (req, res) => {
      axios(configuration(`products/${req.params.id}`, "get"))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getProductStyles: (req, res) => {
      axios(configuration(`products/${req.params.id}/styles`, "get"))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getRelatedProducts: (req, res) => {
      axios(configuration(`products/${req.params.id}/related`, "get"))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
  },
  qa: {
    getQuestions: (req, res) => {
      queryParams = {
        product_id: req.params.id,
        count: 100
      };
      axios(configuration("qa/questions", "get", queryParams))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    getAnswers: (req, res) => {
      queryParams = {
        count: 100
      };
      axios(configuration(`qa/questions/${req.params.id}/answers`, "get", queryParams))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    updateQuestionHelpfulness: (req, res) => {
      axios(configuration(`qa/questions/${req.params.id}/helpful`, "put"))
        .then((response) => {
          res.status(200).send();
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    updateAnswerHelpfulness: (req, res) => {
      axios(configuration(`qa/answers/${req.params.id}/helpful`, "put"))
        .then((response) => {
          res.status(200).send();
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    postQuestions: (req, res) => {
      questionObject = req.body;
      axios(configuration(`qa/questions/`, "post", null, questionObject))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    postAnswers: (req, res) => {
      answerObject = req.body;
      axios(configuration(`qa/questions/${req.params.id}/answers/`, "post", null, answerObject))
        .then((response) => {
          res.status(200).send(response.data);
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
    reportAnswer: (req, res) => {
      axios(configuration(`qa/answers/${req.params.id}/report`, "put"))
        .then((response) => {
          res.status(200).send();
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    },
  },
};
