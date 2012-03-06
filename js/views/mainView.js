define([
    'jquery',
    'underscore',
    'backbone',
    'collections/lists',
    'views/list'
    ], function($, _, Backbone, ListCollection, ListView){
        var mainView = Backbone.View.extend({
        
        el: $('body'),

        // Define events on view
        events: {
            "click #add-list" : "addListOnClick",
            "keypress #add-list-input" : "addListOnClick"
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
            if (this.$('#add-list-input').val() === '') return;
            if (e.keyCode !== undefined && e.keyCode !== 13) return;

            ListCollection.create({title: this.$('#add-list-input').val()});
            this.$('#add-list-input').val('');
            this.$('#add-list-input').blur();
            this.$('#todoapp').children().remove();
            this.addAll();
        }
    });
    return mainView;
});