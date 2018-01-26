/**
 * Adpost.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  connection: 'mongodbServer',
  tableName: 'adpost',
  attributes: {
  	title : {
  		type : 'string',
  		required :'true'
  	}
      product: {
          model: 'products'
      },
      member: {
          model: 'user'
      },
      active: {
          type: 'boolean',
          required: true,
          enum: [true, false],
          defaultsTo: true
      }
  },
};