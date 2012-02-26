define([
	'underscore',
	'backbone'
	], function(_, Backbone) {
		var task = Backbone.Model.extend({
			initialize: function (){
			},

			/**
			* Set default values of object
			*/
			defaults: {
				content: "no taks description",
				done: false
			},

			/**
			* set done status
			*/
			toggle: function() {
				this.save({done: !this.get("done")});
			},

			/**
			* return status of task
			*/
			isDone: function() {
				return this.get('done');
			},

			/**
			* deletes model and view
			*/
			clear: function() {
				this.destroy();
				this.view.remove();
			}
  });
  return task;
});