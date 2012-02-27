// Configurerar require
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text'
  }

});

require(['views/app'], function(app){
  var app_view = new app;
});
