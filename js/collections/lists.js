define([
	'backbone',
	'libs/backbone/localstorage',
	'models/list'
	], function(Backbone, Store, List) {
		var ListCollection = Backbone.Collection.extend({
			
			//create a localstorage
			localStorage : new Store("list"),

			//Define type of model for collection
			model: List
		});
	return new ListCollection();
});