const express = require(`express`);
const router = express.Router();
const costController = require(`../controllers/cost_controller`);

router.post(`/addcost`, costController.addCost);

module.exports = router;