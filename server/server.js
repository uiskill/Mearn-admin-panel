const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToMongo = require("./db");
const User = require("./models/User");
router = express.Router();
const app = express();
const placementRoute = require("./routes/placement.routes");
const facultyRoute = require("./routes/faculty.routes");




app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use("/placement", placementRoute);
app.use("/faculty", facultyRoute);
connectToMongo();


app.listen(5000, () => {
  console.log("server started");
});

app.post("/auth", async (req, res) => {
  const UserEmail = req.body.email;
  const UserPassword = req.body.password;

  if (UserEmail === "admin123@gmail.com" && UserPassword === "admin123") {
    res.json({ status: "true", fname: "Admin", user: "Admin" });
  } 
  else {
    const user = await User.findOne({
      $and: [{ email: UserEmail }, { password: UserPassword }],
    });
    console.log(user);
    if (user !== null) {
      res.status(200).json({
        status: "true",
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        course: user.course,
        user: "Student",
        id: user.UserEmail,
      });
    } else {
      console.log("sended false");
      res.send(false);
    }
  }
});












// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});