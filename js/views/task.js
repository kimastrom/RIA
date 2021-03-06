define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todoTask.html'
    ], function($, _, Backbone, taskTemplate){
    var task = Backbone.View.extend({

        // task is a list tag
        tagName:  "li",

        events: {
            "click .task img"       : "deleteTask",
            "click .task-status"    : "toggleDone",
            "dblclick .task-text"   : "editTask",
            "keypress .edit"        : "saveEdit"
        },

        // template for task
        template: _.template(taskTemplate),

        // initializes task view         
        initialize: function() {
            _.bindAll(this, 'closeEdit');
            this.model.view = this;
        },

        // Set content to task
        setContent: function() {
            var content = this.model.get('content');
            this.$('.task-text').text(content);
            if(this.model.isDone()) {
                this.$('.task-status').attr('checked', true);
            }
        },

        // render task
        render: function() {
            $(this.el).html(this.template());
            this.setContent();
            return this;
        },

        // delete task
        deleteTask: function(e) {
            $(this.el).remove();
            this.model.destroy();
        },

        // show edit view of task
        editTask: function(e) {
            this.$('.task-text').remove();
            this.$('.task-status').after("<input type='text' class='edit' value='"+this.model.get('content')+"'/>");
            this.$('.edit').focus();
            this.$('.edit').bind('blur', this.closeEdit);
        },

        // close edit view on task
        closeEdit: function() {
            var taskText = this.$('.edit').val();
            if(taskText.length > 0){
            	this.model.save({content: taskText},{
            		error: function(model,response){$('#msg').append('<p class="msg">' + response + '</p>')}}
				);
        	}	
            this.$('.edit').remove();
            this.$('.task-status').after("<p class='task-text'>"+this.model.get('content')+"</p>");
            
            //Nice message fadeout :) and then remove it.
            $('.msg').delay(7000).fadeOut();
            setTimeout(function() {
  				$('.msg').remove();
			}, 8000);
        },

        // close edit view on key event
        saveEdit: function(e) {
            if (e.keyCode === 13) {
                this.closeEdit();
            }
        },

        // mark task as done or undone
        toggleDone: function (e) {
            this.model.toggle();
        }

    });
    return task;
});
