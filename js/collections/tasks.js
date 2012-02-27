define([
    'underscore',
    'backbone',
    'libs/backbone/localStorage',
    'models/task'
    ], function(_, Backbone, Store, Task) {
        var TaskCollection = Backbone.Collection.extend({

            //Define type of model for collection
            model: Task,

            // initializes the collections and create
            // a local storage with `list` id as key
            initialize: function(list) {
                this.listID = list.id;
                //create storage with listID as key
                this.localStorage = new Store(list.id);
            },

            // filter the collection of done tasks
            done: function() {
                return this.filter(function(task){ return task.get('done'); });
            },

            //sorts the collection by done status
            comparator: function(task) {
                return task.get('done');
            },

            // delete the localstorage
            destroy: function() {
                localStorage.removeItem(this.listID);
            }
        });
    return TaskCollection;
});