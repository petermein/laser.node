/**
 * sass,borwserfy,pug
 */
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var browserify = require('browserify-middleware');
var path = require('path');

var staticPath = path.join(__dirname,'..','static');
var staticSrc = path.join(staticPath,'src');
var staticDist = path.join(staticPath,'dist');


module.exports = function(app){
  //pug engine
  app.engine('pug', require('pug').__express);
  app.set('view engine', 'pug');
  app.set('views',path.join(__dirname,'views'));

  
  //staitc    
  app.use([
    sassMiddleware({
      src: staticSrc,
      dest: staticDist,
      debug: true,
      outputStyle: 'compressed',
      indentedSyntax: true, //false if scss
    }),
    browserify(staticSrc),
    express.static(staticDist),
    express.static(staticSrc),
  ]);
};