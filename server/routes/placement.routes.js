
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let PlacementSchema = require("../models/Placement");

// CREATE placement
router.route("/add-placement").post(async (req, res, next) => {
    await PlacementSchema
      .create(req.body)
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully added!",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });


  // READ Placement
  router.route("/").get(async (req, res, next) => {
    await PlacementSchema
      .find()
      .then((result) => {
        res.json({
          data: result,
          message: "All items successfully fetched.",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
  
  
  // Get Placement
  router.route("/get-placement/:id").get(async (req, res, next) => {
    await PlacementSchema
      .findById(req.params.id)
      .then((result) => {
        res.json({
          data: result,
          message: "Data successfully fetched.",
          status: 200,
        });
      })
      .catch((err) => {
        return next(err);
      });
  });
  // Update placement
  router.route("/update-placement/:id").put(async (req, res, next) => {
    await PlacementSchema
      .findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      .then((result) => {
        console.log(result);
        res.json({
          data: result,
          msg: "Data successfully updated.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  // Delete placement
 

  router.route("/delete-placement/:id").delete(async (req, res, next) => {
    await PlacementSchema
      .findOneAndRemove(req.params.id)
      .then(() => {
        res.json({
          msg: "Data successfully deleted.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;
  
  
  
  
  