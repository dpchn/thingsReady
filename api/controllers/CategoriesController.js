/**
 * CategoriesController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `CategoriesController.properties()`
   */
  addCategory : function(req, res){
    var data = req.body;
    Categories.addCategory(data, function(err, result){
      if(err)
        return res.negotiate(err);
      return res.send({"rs":result});   
    });
  }
};

