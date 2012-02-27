// Configurerar require
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
    localstorage : 'libs/backbone/localstorage'
  }

});

require(['views/app'], function(app){
  var app_view = new app;
});
