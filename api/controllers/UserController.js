/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var validator = require("email-validator");
var _ = require('underscore-node');
//var jwt = require('jsonwebtoken');
var enumset = require('node-enum');



var UserController = {
	


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    var checkValidation = UserController.signupValidation(req);
    //console.log(checkValidation)
    if(checkValidation)
      return res.send({'message' : checkValidation});
   User.signup({firstname : req.body.firstname, lastname : req.body.lastname,
                 gender : req.body.gender, email : req.body.email, password : req.body.password, phone : req.body.phone},
                  function(err, result){
      if(err)
        return res.negotiate(err);
      return res.send({"rs":result});
    });
  },  


  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    var checkValidation = UserController.loginValidation(req);
    if(checkValidation)
      return res.send({'message' : checkValidation});
    User.login(req.body, function(err, result){
      if(err)
          return res.negotiate(err);
      else
        return res.send(result)

    }); 
  },

  profile : function(res, req){

  },


  signupValidation : function(req, res){
    var data = req.body;
    var gender = enumset(['male','female']);
    var phoneformat = /^[0-9]+$/;
    var nameformat = /^[a-zA-Z]+$/;
   // console.log(data.password.length)
    if(data.firstname==null || data.lastname==null || !data.firstname.match(nameformat) || !data.lastname.match(nameformat))
        return "Enter valid name";
    if(data.phone==null || !data.phone.match(phoneformat) || (req.body.phone.length>10 || req.body.phone.length<10))
        return "Invalid phone number"
   
    if(data.firstname==null || !(data.gender in gender))
        return "Invalid gender";
    return null;

  },


  profile : function(res, req){
      var data = res.body;
  },

  loginValidation : function(req, res){
    var data = req.body;
     if(data.email ==null || !validator.validate(data.email))
        return "Enter valid email";
    if(data.password==null || data.password.length < 6)
        return "Password lenght should be at least 6";
  }
};
module.exports = UserController;



