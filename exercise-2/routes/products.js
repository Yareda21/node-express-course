const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/products");

router.route("/").get(ctrl.getProducts).post(ctrl.createProduct);
router
    .route("/:id")
    .get(ctrl.getProduct)
    .put(ctrl.updateProduct)
    .patch(ctrl.updateProduct)
    .delete(ctrl.deleteProduct);

module.exports = router;
