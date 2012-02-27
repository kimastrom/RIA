define([
    'jquery',
    'underscore',
    'backbone',
    'views/task',
    'collections/tasks',
    'text!templates/todoList.html'
    ], function($, _, Backbone, TaskView, TaskCollection, listTemplate){
    var list = Backbone.View.extend({

        //template for list
        template: _.template(listTemplate),

        // define all events
        events: {
            "keypress .add-task-textinput"  : "addTaskOnEnter",
            "dblclick .title h1"            : "editTitle",
            "keypress .edit-title"          : "saveTitle",
            "click .remove-cleared"         : "removeCleared",
            "click .delete-list"            : "deleteList"
        },

        // initiliazes the view
        initialize: function() {
            
            $("#todoapp").append($(this.el).html(this.template));
            
            _.bindAll(this, 'addAll', 'addOne', 'render', 'closeTitleEdit', 'deleteList');
            this.model.taskCollection.bind('reset', this.addAll);
            this.model.taskCollection.bind('add', this.addOne);
            this.model.taskCollection.fetch({});
        },

        // set content on list
        render: function() {
            this.setContent();
            return this;
        },

        // set title of list
        setContent: function() {
            var title = this.model.get('title');
            this.$('.title h1').text(title);
        },

        // create view for `task` and add task to DOM
        addOne: function(task) {
            view = new TaskView({model: task});
            this.$(".list-content").append(view.render().el);
        },

        // hämtar alla tasks och renderar dem via funktionen addOne
        addAll: function() {
            this.model.taskCollection.each(this.addOne);
        },

        // deletes all finished tasks
        removeCleared: function() {
            _.each(this.model.taskCollection.done(), function(task){ task.clear(); });
        },

        // Add new task
        addTaskOnEnter: function(e) {
            if (e.keyCode === 13 && this.$(".add-task-textinput").val().length > 0 ) {
                var taskText = this.$(".add-task-textinput").val();
                this.model.taskCollection.create({content: taskText});
                this.$(".add-task-textinput").val('');
            }
        },

        // change to edit view of list title
        editTitle: function(e) {
            this.$('.title h1').hide();
            this.$('.title').append("<input class='edit-title' type='text' value='"+this.model.get('title')+"' />");
            this.$('.edit-title').focus();
            this.$('.edit-title').bind('blur', this.closeTitleEdit);
        },

        // save the changes and closes the edit view
        closeTitleEdit: function() {
            var title = this.$('.edit-title').val();
            if(title.length > 0) { this.model.save({title: title});}
            this.$('.edit-title').remove();
            this.$('.title h1').text(this.model.get('title'));
            this.$('.title h1').show();
        },

        // close edit view on key event
        saveTitle: function(e) {
            if (e.keyCode === 13) {
                this.closeTitleEdit();
            }
        },

        // delete list
        deleteList: function() {
            this.model.taskCollection.destroy();
            this.model.destroy();
            this.remove();

        }

    });
    return list;
});