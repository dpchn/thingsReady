/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    secretePassword = 'SECRETE';
var jwt = require('jsonwebtoken');
//var jwt = require('express-jwt');
var secretKey = 'USPER_SECRET';

module.exports = {
	connection: 'mongodbServer',
	tableName : 'user',

	attributes: {

		firstname:{ 
			type: 'string',
			required: true
		},

		lastname : {
			type: 'string',
		},

		email : {
			type: 'string',
			required:true,
			unique:true
	},

	phone:{
		type:'string',
		required:true,
		unique:true
	},

	password : {
		type: 'string',
		required:true,
		minLength:6
	},

	products : {
		collection : 'products',
		via : 'member'
	}

	adposted : {
		collection : 'adpost',
		via : 'member'
	}
	active:{
		type:'boolean',
		required:true,
		enum:[true,false],
		defaultsTo:true
	}
},




	signup: function(data, cb){
	

		User.findOne({$or:[ {email : data.email}, {phone : data.phone}]}).exec(function (err, user){
			if(err)
				cb(err)
			else if(!err && user){ 
				sails.log.debug("result", user);
				cb(null, user)
			} 
			else{
				var cipher = crypto.createCipher(algorithm,secretePassword)
			  var crypted = cipher.update(data.password,'utf8','hex');
			  crypted += cipher.final('hex');
			  data.password = crypted;
			  	
			  User.create(data, function (err, newresult){

						var token = jwt.sign({payload:newresult}, "secret");
						newresult.token = token;
						cb( err, newresult)
				}); 				
			}
		});
	},


	login : function(data, cb){
			
		/*	var decipher = crypto.createDecipher(algorithm,secretePassword)
  		var dec = decipher.update(text,'hex','utf8')
  				dec += decipher.final('utf8');
*/
				var cipher = crypto.createCipher(algorithm,secretePassword)
			  var crypted = cipher.update(data.password,'utf8','hex');
			  crypted += cipher.final('hex');
			  data.password = crypted;


			User.findOne({$and:[{email : data.email}, {password : crypted}, {active : true}]}, function(err, result){
				console.log(result)
				if(result && !err){
					var token = jwt.sign({payload:result}, "secret");
						result.token = token;
					cb(null, result);
				}
				else if(err){
					cb(err, result);
				}
				else{
					cb(null, "Wrong email/password");
				}
			});
	},

	profile : function(id, cb){
		User.findOne({id : id}).exec(function(err, result){
			if(err)
				cb(err);
			else
				cb(null, result);
		});
	}
};

