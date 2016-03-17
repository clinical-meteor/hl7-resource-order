
Orders = new Meteor.Collection('orders');

if (Meteor.isClient){
  Meteor.subscribe('orders');
}



OrderSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Order"
    }
});
Orders.attachSchema(OrderSchema);
