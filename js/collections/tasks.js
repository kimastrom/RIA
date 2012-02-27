define([
	'underscore',
	'backbone',
	'libs/backbone/localStorage',
	'models/task'
	], function(_, Backbone, Store, Task) {
		var TaskCollection = Backbone.Collection.extend({
			url: '/',
			model: Task,

            /**
             * initializes the collections
             * @param List object
             */
            initialize: function(model) {
                this.listID = model.id;
                //create storage with listID as key
                this.localStorage = new Store(model.id);
            },

            /**
             * filter the collection of done tasks
             */
            done: function() {
                return this.filter(function(task){ return task.get('done'); });
            },

            /**
             * sorts the collection by done status
             */
            comparator: function(task) {
                return task.get('done');
            },

            /**
             * delete the localstorage
             */
            destroy: function() {
            localStorage.removeItem(this.listID);
            }
        });
    return TaskCollection;
});