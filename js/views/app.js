define([
    'jquery',
    'underscore',
    'backbone',
    'collections/lists',
    'views/list'
    ], function($, _, Backbone, ListCollection, ListView){
        var todoView = Backbone.View.extend({
        
        el: $('body'),

        // Define events on view
        events: {
            "click #add-list" : "addListOnClick"
        },

        // Initializes the view
        initialize: function() {
            _.bindAll(this, 'addAll', 'addOne');
            ListCollection.bind('reset', this.addAll);
            ListCollection.bind('add', this.addOne);
            ListCollection.fetch({});
        },

        // Add one `list`
        addOne: function(list) {
            view = new ListView({model: list});
            view.render();
        },

        // hämtar alla listor och renderar dem via funktionen addOne
        addAll: function() {
            ListCollection.each(this.addOne);
        },

        // Creates a new list object on click event
        addListOnClick: function(e) {
            ListCollection.create({title: 'default title'});
            this.$('#todoapp').children().remove();
            this.addAll();
        }

    });
    return todoView;
});