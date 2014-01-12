(function (){
    window.App = {};

    //  Template helpers:
    window.template = function(id) {
        return _.template($('#' + id).html());
    };
}());

// Модель одного человека
var Person = Backbone.Model.extend({
    defaults: {
        name: 'Alex',
        age: '22',
        job: 'web developer'
    },

    validate: function (attrs) {
        console.log('attrs: ', attrs);
        if (attrs.age <= 0) {
            return 'age should be more than 0'
        }

        if (!attrs.name) {
            return 'Name is not defined'
        }
    },

    walk: function () {
        return this.get('name') + ' is walking!';
    }
});


// Список людей
var PeopleCollection = Backbone.Collection.extend({
    model: Person
});

//Вид списка людей

var PeopleView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function () {
        console.log('collection initialize', this.collection);

        this.render();
    },

    render: function() {
        this.collection.each (function(person){
            console.log('collection render ', this.collection);

            var personView = new PersonView({model: person});
            this.$el.append(personView.el);

            console.log('personView: ', personView);

        }, this);

        this.$el.appendTo($('.content'));

        return this;
    }
})

// Вид одного человека
var PersonView = Backbone.View.extend({

    tagName: 'li',
//    className: 'customers',
//    id: 'some-id'

//    template: _.template( $('#person-id').html() ),
//    *********** Other way to define template:
//    template: '#person-id',
//    *********** Define template with helper:
    template: template('person-id'),

    initialize: function () {
        console.log('from initialize');
        this.listenTo(this.model, "change", this.render);

        this.render();
    },

    render: function () {
        console.log('render');

        this.$el.html(this.template(this.model.toJSON()));
//        *********** Other way to define template:
//        var template = _.template( $(this.template).html() )
//        this.$el.html(template(this.model.toJSON()));

        return this;
    }
});


// ********** Anti-patterns: (should use collections if required)
//var person = new Person;
//var personView = new PersonView({model: person});
//
//var person2 = new Person({name: 'Chi', age: 42});
//var personView2 = new PersonView({model: person2});

var peopleCollection = new PeopleCollection([
    {
        name: 'Andrey',
        age: '34',
        job: 'traveler'
    },
    {
        name: 'Alex',
        age: '24'
    },
    {
        name: 'Max',
        age: '28'
    }
]);

var peopleView = new PeopleView({collection: peopleCollection})

// ******* In the real case:
//var people = [] //data from server
//var peopleCollection = new PeopleCollection(people)
