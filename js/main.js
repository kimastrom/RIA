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

require(['views/mainView'], function(mainView){
  var main_view = new mainView;
});
