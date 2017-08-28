/**
 * custom express
 */

var counter = 1

module.exports = function(app){
  app.get('/',function(req,res,next){
    res.render('index',{number:counter++})
  });
};