define([
    'underscore',
    'backbone',
    'collections/tasks'
    ], function(_, Backbone, TaskCollection){
        var list = Backbone.Model.extend({
            
            // collection of tasks
            taskCollection : null,

            // initializes the model
            initialize: function () {
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