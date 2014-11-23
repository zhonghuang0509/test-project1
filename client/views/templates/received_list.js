Template.receivedList.helpers({
  receives: function() {
  	return Receives.find({}, {sort: {'message-timestamp': -1}});
  }
});


Template.receivedList.events({
  'click button#delButton': function(e) {
    e.preventDefault();
    	Meteor.call('deleteReceivedMessages', function(error, result){
    		console.log(error);
    	});
   }
});
