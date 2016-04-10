
// create the object using our BaseModel
Order = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Order.prototype._collection = Orders;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Orders = new Mongo.Collection('Orders');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Orders._transform = function (document) {
  return new Order(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Orders");
}

if (Meteor.isServer){
  Meteor.publish("Orders", function (argument){
    if (this.userId) {
      return Orders.find();
    } else {
      return [];
    }
  });
}


OrderSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Order"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // Identifiers assigned to this order by the orderer or by the receiver
  "date" : {
    optional: true,
    type: Date
  }, // When the order was made
  "subject" : {
    optional: true,
    type: ReferenceSchema
  }, // (Patient|Group|Device|Substance) Patient this order is about
  "source" : {
    optional: true,
    type: ReferenceSchema
  }, // (Practitioner|Organization) Who initiated the order
  "target" : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization|Device|Practitioner) Who is intended to fulfill the order
  // reason[x]: Text - why the order was made. One of these 2:
  "reasonCodeableConcept" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "reasonReference" : {
    optional: true,
    type: ReferenceSchema
  },
  "when.code" : {
    optional: true,
    type: CodeableConceptSchema
  }, // C? Code specifies when request should be done. The code may simply be a priority code
  "when.schedule" : {
    optional: true,
    type: TimingSchema
  }, // C? A formal schedule
  "detail" : {
    optional: true,
    type: [ ReferenceSchema ]
  }// R!  What action is being ordered
});
Orders.attachSchema(OrderSchema);
