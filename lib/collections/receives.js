Receives = new Mongo.Collection('receives');

Meteor.methods({
  receivedInsert: function(attr) {
    check(attr, {
	    msisdn: String,
		to: String,	
		massageId: String,
		text: String,
		"message-timestamp": String
    });

	var post = attr;
    var postId = Receives.insert(post);
  }
});

Meteor.methods({
  deleteReceivedMessages: function(){
    Receives.remove({});
  }
})