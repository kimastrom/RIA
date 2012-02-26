define([
	'underscore',
	'backbone',
	'collections/tasks',
	'models/task'
	], function(_, Backbone, TaskCollection, TaskModel){
		var list = Backbone.Model.extend({

			taskCollection : null,

			/**
			* initializes the model
			*/
			initialize: function (model) {
				
				if(!this.id) {
					this.bind('change:id',function(){
						this.taskCollection = new TaskCollection({id :this.id});
					},this);
				} else {
					
				}
				this.taskCollection = new TaskCollection({id: this.id});
				
			}

		});
	return list;
});