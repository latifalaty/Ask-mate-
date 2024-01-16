const express = require("express");
const router = express.Router();
//import User Model
const User = require("../models/Users");

//import Bcrypt module
const bcrypt = require("bcrypt");
const user = require("../models/Users");

//SignUp
router.post("/signup", (req, res) => {
  console.log("here in create user", req.body);
  let user = {};
  User.findOne({ email: req.body.email }).then(
    (resultEmail) => {
      if (resultEmail) {
        res.status(200).json({
          message: "that email has already registered ,please use a different email"
        });
      }
      else {
        bcrypt.hash(req.body.pwd, 10).then(cryptedPwd => {
          user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            pwd: cryptedPwd,


          });
          //sauvegarde (save()est une foncion prédéfinies du mongodb) 
          user.save();
          res.status(200).json({
            message: "User created",
            data: user

          })
        })
      }
    }
  )
});


//SignIN
router.post("/login", (req, res) => {
  console.log("Here user obj from FE", req.body);
  User.findOne({ email: req.body.email })
    .then((emailResult) => {
      console.log("Search by email", emailResult);
      if (!emailResult) {
        res.status(500).json({
          message: "0", // User not found
        });
      }
      return bcrypt.compare(req.body.pwd, emailResult.pwd);
    })
    .then((pwdResult) => {
      console.log("pwdResult", pwdResult);
      if (!pwdResult) {
        res.status(400).json({
          message: "1", // Password is incorrect
        });
      }
      User.findOne({ email: req.body.email }).then((finalResult) => {
        console.log("finalResult", finalResult);
        let userToSend = {
          firstName: finalResult.firstName,
          lastName: finalResult.lastName,
          id: finalResult._id,

        };
        console.log("userToSend", userToSend);
        res.status(200).json({
          message: "2", // Successful login
          result: userToSend,
        });
      });
    });
});


//  Edit UserBy_ID (Update)
router.put("/:id", (req, res) => {
  // param: id
  console.log("here into edit user", req.params.id);
  // new values: req.body
  console.log("here into edit user", req.body);
  User.updateOne({ _id: req.params.id }, req.body).then((result) => {

    console.log("Here result after update", result),
      res.status(200).json({
        message: "Edited with success",

      });
  })
});


//Get All Users
router.get("/", (req, res) => {
  console.log("Here into BL to get all users");
  User.find().then((result) => {
    console.log("Here result after find", result);


    if (result) {
      res.status(200).json({
        message: "Here all users",
        result: result,

      });
    }
  });
});



// Business Logic: Get User By ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Assuming User is the model for the users collection
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Business Logic: Delete User By ID
router.delete("/:id", (req, res) => {
  console.log("Here into delete", req.params.id);
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log("Here result after delete", result);
    if (result.deletedCount == 1) {
      res.status(200).json({
        alert: " Deleted with success",
        message: " Deleted with success",
      });
    }
  });
});


//logout
router.post('/logout', (req, res) => {
  // If using sessions
  req.session.destroy((err) => {
    if(err) {
      return res.status(500).json({ message: "Logout failed." });
    }
    res.status(200).json({ message: "Logout successful." });
  });

  // If blacklisting JWT tokens, implement token invalidation logic here.
});
module.exports = router;
