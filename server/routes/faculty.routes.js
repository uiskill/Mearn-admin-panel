
let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let FacultySchema= require("../models/Faculty");

// CREATE placement
router.route("/add-faculty").post(async (req, res, next) => {
    await FacultySchema
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


  

  // READ Faculty
  router.route("/").get(async (req, res, next) => {
    await FacultySchema
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
  
  
  // Get Faculty
  router.route("/get-faculty/:id").get(async (req, res, next) => {
    await FacultySchema
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
  // Update faculty
  router.route("/update-faculty/:id").put(async (req, res, next) => {
    await FacultySchema
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
  
  // Delete faculty
 

  router.route("/delete-faculty/:id").delete(async (req, res, next) => {
    await FacultySchema
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
  
  
  
  
  