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
            }
  });
  return task;
});