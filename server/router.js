const controllers = require("./controllers.js");
const router = require("express").Router();

// Product Routes
router.route("/products").get(controllers.products.getProducts);
router.route("/products/:id").get(controllers.products.getProductInfo);

// Question and Answers Routes
router.route("/qa/questions/:id").get(controllers.qa.getQuestions);
router.route("/qa/questions/:id/answers").get(controllers.qa.getAnswers);
router.route("/qa/questions/:id/helpful").put(controllers.qa.updateQuestionHelpfulness);
router.route("/qa/answers/:id/helpful").put(controllers.qa.updateAnswerHelpfulness);
router.route("/qa/questions").post(controllers.qa.postQuestions);
router.route("/qa/questions/:id/answers").post(controllers.qa.postAnswers);
router.route("/qa/answers/:id/report").put(controllers.qa.reportAnswer);

module.exports = router;
