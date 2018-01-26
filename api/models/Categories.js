/**
 * Categories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	connection: 'mongodbServer',
	tableName : 'categories',

  attributes: {

    category_name : { 
    	required:true
     },

     product : {
     	collection : 'products',
     	via : 'category'
     },
     value:{
     	type:'integer',
     	required:true,
     	defaultsTo:0
     },

    active:{
		type:'boolean',
		required:true,
		enum:[true,false],
		defaultsTo:true
	}
  },


 addCategory: function(data, cb){
 	Categories.create({category_name:data}).exec(function(err, result){
 		if(err)
 			cb(err);
 		else
 			cb(null, result);
 	});
 }
};


