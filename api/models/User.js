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
var secretKey = 'USPER_SECRET';

module.exports = {
	connection: 'mongodbServer',
	tableName : 'signUp',

	attributes: {

		firstname:{ 
			type: 'string',
			required: true
		},

		lastname : {
			type: 'string',
			required: true	
		},

		gender : {
			type: 'array',
			required:true,
			enum:['male','female']
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

		password :{
			type: 'string',
			required:true,
			minLength:6
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

						var token = jwt.sign({id:'newresult'}, secretKey);
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


			User.findOne({$and:[{email : data.email}, {password : crypted}]}, function(err, result){
				console.log(result)
				if(result && !err){
					cb(null, result);
				}
				else if(err){
					cb(err, result);
				}
				else{
					cb(null, "Wrong email/password");
				}
			});
	}
};

