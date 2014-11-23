Template.receivedList.helpers({
  receives: function() {
  	return Receives.find();
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
