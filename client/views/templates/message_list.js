Template.messageList.helpers({
  posts: function() {
    return Posts.find();
  }
});

Template.messageList.events({
  'click button#delButton': function(e) {
    e.preventDefault();
    	Meteor.call('deleteMessages', function(error, result){
    		console.log(error);
    	});
   }
});
