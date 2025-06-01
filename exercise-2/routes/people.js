const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/people");

router.route("/").get(ctrl.getPeople).post(ctrl.createPerson);
router
    .route("/:id")
    .get(ctrl.getPerson)
    .patch(ctrl.updatePerson)
    .delete(ctrl.deletePerson);
router.route("/:userId/bookmarks").get(ctrl.getBookmarks);
router
    .route("/:userId/bookmarks/:productId")
    .post(ctrl.addBookmark)
    .delete(ctrl.removeBookmark);

module.exports = router;
