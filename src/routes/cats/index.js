const express = require("express");
const router = express.Router();
const catsControllers = require("../../controllers/catsControllers");
const {
  validateCreateCat,
  validateUpdateCat,
  validateUpdateStatusCat,
} = require("../../validation/catValidation");
const guard = require("../../helpers/guard");

router
  .get("/", guard, catsControllers.getAll)
  .get("/:id", guard, catsControllers.getById)
  .post("/", guard, validateCreateCat, catsControllers.create)
  .put("/:id", guard, validateUpdateCat, catsControllers.update)
  .patch(
    "/:id/vaccinated",
    guard,
    validateUpdateStatusCat,
    catsControllers.updateStatus
  )
  .delete("/:id", guard, catsControllers.remove);

module.exports = router;
