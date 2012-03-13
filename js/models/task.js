define([
    'underscore',
    'backbone'
    ], function(_, Backbone) {
        var task = Backbone.Model.extend(
        {
            // Set default values of object
            defaults: {
                content: "no taks description",
                done: false
            },

            // Set done task
            toggle: function() {
                this.save({done: !this.get("done")});
            },

            // Return status on task
            isDone: function() {
                return this.get('done');
            },

            // deletes model and view
            clear: function() {
                this.destroy();
                this.view.remove();
            },
            validate: function(attr) {
            	if(attr.content.length > 20) { 
            		return ('Are you an author maybe? This is a todo, please write a bit shorter. Only 20 characters allowed!'); 
        		}
        	}
  });
  return task;
});