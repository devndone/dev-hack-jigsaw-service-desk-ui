App = Ember.Application.create();

App.Customer = Ember.Object.extend({
  name: '',
  mobile: '',
  tickets: [],
});

App.Customer.reopenClass({
  createRecord: function(data) {
    var customer = App.Customer.create({ name: data.name, mobile: data.mobileNumber, tickets: data.tickets });
    return customer;
  }
});

App.Router.map(function() {
  this.resource('customers', function() {
    //this.route('tickets', { path: ':slug' });
  });
});

App.CustomersRoute = Ember.Route.extend({
  model: function() {
    var customerObjects = Ember.A();
    Ember.$.getJSON('http://localhost:8080/customer', function(customers) {
      //alert(customers);
      customers.forEach(function(data) {
        customerObjects.pushObject(App.Customer.createRecord(data));
      });
    });
    return customerObjects;
  }
});


