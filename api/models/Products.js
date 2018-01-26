/**
 * Products.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  connection: 'mongodbServer',
  tableName: 'products',
  attributes: {
    product_name: {
        type: 'string',
        required: true
    },
    member: {
        model: 'user'
    },
    category: {
        model : 'categories'
    },
    price: {
        type: 'int',
        required: 'true'
    },
    description : {
    	type : 'string',

    }
    image : {
    	type : 'array',
    	required : 'true'
    }
    active: {
        type: 'boolean',
        required: true,
        enum: [true, false],
        defaultsTo: true
    }
  },
};